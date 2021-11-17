import { useState } from "react";
import { db } from "./firestore-config";
import { collection, onSnapshot } from "firebase/firestore"
import getClick from './hook/http.hook'

const colRef = collection(db, 'count')

function App() {
  const [count, setCount] = useState(null)

      onSnapshot(colRef, (snapshot) => {
        const abc = snapshot.docs.map(doc => doc.data())
        setCount(abc[0].count)
      })

  return (
    <div className="App">
      <h1>
        Counter: {count}
      </h1>
      <button onClick={ () => {getClick('/new_click')} }>
        Api Kicked {count} times
      </button>
      <button onClick={ () => {getClick('/clear')} }>
        CleanAPI
      </button>
    </div>
   )
}

export default App;