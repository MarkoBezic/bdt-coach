import React, {useEffect} from 'react';
import CRUDTable,
{Fields, Field, CreateForm, UpdateForm, DeleteForm,
} from 'react-crud-table';

// Component's Base CSS
import '../index.css';
import './AdminPage.css';
import SectionNavbar from "../components/SectionNavbar";
import {LOCAL_STORAGE_KEY_EXERCISES} from "../hooks/useLocalStorage";

export default function AdminPage() {

  let storageEx = localStorage.getItem(LOCAL_STORAGE_KEY_EXERCISES)
  let exercises = JSON.parse(storageEx) || []

  const saveExercises = (exercises) => {
    const exercisesAsString = JSON.stringify(exercises)
    localStorage.setItem(LOCAL_STORAGE_KEY_EXERCISES, exercisesAsString);
  }

  const SORTERS = {
    NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
    NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
    STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
    STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a)),
  };

  const getSorter = (data) => {
    const mapper = x => x[data.field];
    let sorter = SORTERS.STRING_ASCENDING(mapper);

    if (data.field === 'id') {
      sorter = data.direction === 'ascending' ?
        SORTERS.NUMBER_ASCENDING(mapper) : SORTERS.NUMBER_DESCENDING(mapper);
    } else {
      sorter = data.direction === 'ascending' ?
        SORTERS.STRING_ASCENDING(mapper) : SORTERS.STRING_DESCENDING(mapper);
    }

    return sorter;
  };

  let count = exercises.length;
  const service = {
    fetchItems: (payload) => {
      storageEx = localStorage.getItem(LOCAL_STORAGE_KEY_EXERCISES)
      exercises = JSON.parse(storageEx) || []

      let result = Array.from(exercises);
      result = result.sort(getSorter(payload.sort));
      return Promise.resolve(result);
    },
    create: (exercise) => {
      count += 1;
      exercises.push({
        ...exercise,
        id: count,
      });

      saveExercises(exercises)

      return Promise.resolve(exercise)
    },
    update: (data) => {
      const exercise = exercises.find(t => t.id === data.id);
      exercise.name = data.name;
      exercise.rep_duration = data.rep_duration;
      exercise.color = data.color;

      saveExercises(exercises)

      return Promise.resolve(exercise)
    },
    delete: (data) => {
      const exercise = exercises.find(t => t.id === data.id);
      const exercisesPostProcess = exercises.filter(t => t.id !== exercise.id);

      saveExercises(exercisesPostProcess)

      return Promise.resolve(exercise)
    },
  };

  const styles = {
    container: { margin: 'auto', width: 'fit-content' },
  };

  return <div style={styles.container}>
    <SectionNavbar />
    <CRUDTable caption="Exercises" fetchItems={payload => service.fetchItems(payload)}>
      <Fields>
        <Field name="id" label="Id" hideInCreateForm hideInUpdateForm readOnly/>
        <Field name="name" label="Name" placeholder="Name"/>
        <Field name="rep_duration" label="Rep Duration (sec.)" placeholder="How long does this rep last?"/>
        <Field name="color" label="Color" placeholder="#F00"/>
      </Fields>

      <CreateForm title="Exercise Creation" message="Create a new exercise!" trigger="Create Exercise"
        onSubmit={exercise => service.create(exercise)} submitText="Create"
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Please, provide exercise\'s name';
          }

          if (!values.rep_duration) {
            errors.rep_duration = 'Please, provide the rep duration';
          }

          return errors;
        }}
      />

      <UpdateForm title="Exercise Update Process" message="Update exercise" trigger="Update"
        onSubmit={exercise => service.update(exercise)} submitText="Update"
        validate={(values) => {
          const errors = {};

          if (!values.id) {
            errors.id = 'Please, provide id';
          }

          if (!values.name) {
            errors.name = 'Please, provide exercise\'s name';
          }

          if (!values.rep_duration) {
            errors.rep_duration = 'Please, provide exercise\'s rep duration';
          }

          return errors;
        }}
      />

      <DeleteForm title="Exercise Delete Process" message="Are you sure you want to delete the exercise?" trigger="Delete"
        onSubmit={exercise => service.delete(exercise)} submitText="Delete"
        validate={(values) => {
          const errors = {};
          if (!values.id) {
            errors.id = 'Please, provide id';
          }
          return errors;
        }}
      />
    </CRUDTable>
  </div>
};

AdminPage.propTypes = {};
