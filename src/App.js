import React from 'react';
import Timeline from './components/Timeline';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUndoAlt, faSearchMinus, faSearchPlus, faCoffee } from '@fortawesome/free-solid-svg-icons';

library.add(faUndoAlt, faSearchMinus, faSearchPlus, faCoffee)

function App({data}) {
  return (
      <Timeline data={data}/>
  );
}

export default App;
