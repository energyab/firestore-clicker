import { useState } from "react";
import { db } from "./firestore-config";
import { collection, onSnapshot } from "firebase/firestore"

const colRef = collection(db, 'count')

function App() {
  const [count, setCount] = useState(null)

      onSnapshot(colRef, (snapshot) => {
        const abc = snapshot.docs.map(doc => doc.data())
        setCount(abc[0].count)
      })

const KickApi = () => {
    try {
      fetch("/new_click")
    } catch (e) {
      console.log(e.message)
    }
  }

  const ClearApi = () => {
    try {
      fetch("/clear")
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <div className="App">
      <h1>
        Counter: {count}
      </h1>
      <button onClick={KickApi}>
        Api Kicked {count} times
      </button>
      <button onClick={ClearApi}>
        CleanAPI
      </button>
    </div>
   )
}

export default App;