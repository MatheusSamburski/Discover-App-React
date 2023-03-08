import React, {useState, useEffect} from "react"
import {Card} from "../../components/Card"
import "./styles.css"

export function Home() {
  const [name, setName] = useState("");
  const [listName, setListName] = useState([]);
  const [user, setUser] = useState({name: '', avatar: ''})

  function handleAddPerson () {
    const newPerson = {
      name: name,
      time: new Date().toLocaleDateString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      })
    }
    setListName(prevState => [...prevState, newPerson]);
  }

  async function getResponseApi () {
    const response = await fetch("https://api.github.com/users/MatheusSamburski")
    const data = await response.json()

    setUser({
      name: data.name,
      avatar: data.avatar_url
    })
  } 

  useEffect(() => {
    getResponseApi()
  }, [])

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} />
        </div>
      </header>
      <input
        type="text"
        placeholder="Digite o nome..."
        onChange={event => setName(event.target.value)}
      />
      <button type="button" onClick={handleAddPerson}>Adicionar</button>

      {listName.map((item, index) => {
        return <Card name={item.name} time={item.time} key={index} />
      })}
    </div>
  )
}

