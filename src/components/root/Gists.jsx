import React from 'react'


const Gist = ({ gist }) => {
    console.log(gist)
    return (
      <div>
        <h1>{gist.title}</h1>
        {gist.overview}
      </div>
    )
  }
  export default Gist;