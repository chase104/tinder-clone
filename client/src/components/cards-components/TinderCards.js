import React, {useState, useEffect, useMemo} from 'react'
import TinderCard from "react-tinder-card"
import axios from 'axios'
import './TinderCards.css'
import Loader from "react-loader-spinner";


function TinderCards() {

  const [people, setPeople] = useState([])
  const [peopleLeft, setPeopleLeft] = useState([])
  const [loaderState, setLoaderState] = useState(true)

  useEffect(() => {
    async function fetchData() {
      console.log("running backend fetch...");
      const req = await axios({
        method: "GET",
        url: "/tinder/cards"
      })
      setPeople(req.data);
      setPeopleLeft(req.data)
    }
    fetchData();
  }, [])

  useEffect(() => {
    console.log(people);
  }, [people]);

  useEffect(() => {
    setTimeout(() => {
      setLoaderState(false)
    }, 10000)
  }, [])

  console.log(people);


  const outOfFrame = (dir, name, personId) => {
    console.log(name + " left the screen! ", dir, personId);
    setPeopleLeft(peopleLeft.pop())
    if (dir === "right") {
      console.log("it's a match!")
      axios({
        method: "PUT",
        url: "/tinder/match",
        data: {name, personId}
      }).then((res) => {
        console.log(res);
      })
    } else {
      console.log(" oh no ! ");
    }
  }

  const getImage = (id) => {
    return (
      <img src={`/get-image/${id}`} className="user-image"/>
    )

  }

  return (
    <div className="tinderCards">
      <div className="tinderCards__cardContainer">
        { people.length >= 1 ? 
          
          people.map(
            (person) => {
          console.log(person);
          return (
          <TinderCard
          className="swipe"
          key={person.name}
          preventSwipe={["up", "down"]}
          onCardLeftScreen={(dir) => outOfFrame(dir, person.name, person._id)}
          >
            <div className="card">
              {getImage(person._id)}
              <h3 style={{backgroundColor:"rgba(89, 89, 89, .9)", borderRadius: "20px", padding: "5px"}}>{person.name}</h3>
            </div>
          </TinderCard>
          ) 
          }
          ) 
          :
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
