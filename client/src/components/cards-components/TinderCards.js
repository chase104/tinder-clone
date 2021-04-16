import React, {useState, useEffect} from 'react'
import TinderCard from "react-tinder-card"
import axios from 'axios'
import './TinderCards.css'
import Loader from "react-loader-spinner";


function TinderCards() {

  const [people, setPeople] = useState([])
  const [loaderState, setLoaderState] = useState(true)

  useEffect(() => {
    async function fetchData() {
      console.log("running backend fetch...");
      const req = await axios({
        method: "GET",
        url: "/tinder/cards"
      })
      setPeople(req.data);
    }
    fetchData();
  }, [])

  useEffect(() => {
    console.log(people);
  }, [people])
  useEffect(() => {
    setTimeout(() => {
      setLoaderState(false)
    }, 10000)
  }, [])

  console.log(people);

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    // setLastdirection(direction)
  }
  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  }

  const getImage = (id) => {
    return (
      <img src={`/get-image/${id}`} className="user-image"/>
    )

  }

  return (
    <div className="tinderCards">
      <div className="tinderCards__cardContainer">
        { people.length >= 1 ? people.map((person) => {
          console.log(person);
          return (
          <TinderCard
          className="swipe"
          key={person.name}
          preventSwipe={["up", "down"]}
          onSwipe={(dir) => swiped(dir, person.name)}
          onCardLeftScreen={() => outOfFrame(person.name)}
          >
            <div className="card">
              {getImage(person._id)}
              <h3 style={{backgroundColor:"rgba(89, 89, 89, .9)", borderRadius: "20px", padding: "5px"}}>{person.name}</h3>
            </div>
          </TinderCard>
        )
        }

) :
        <div className="loader">
          { loaderState ?
              <Loader
              type="TailSpin"
              color="#004aad"
              className="loader-item"
              height={200}
              width={200}
              timeout={10000}
              />
            :
            <div style={{fontSize: "24px", fontWeight: "bold"}}>Connection error, please refresh page</div>
          }
        </div>

      }
        </div>
    </div>
  )
}

export default TinderCards
