import React, { useState } from 'react'

const [isActive, setisActive] = useState(true);

export const ExampleComponent = () => {
  return (
    <div>
        <div>
            <p>Main Title</p>
            <img src='logus.png' alt='thisimg'/>
        </div>
        <h2>Subtile of the card</h2>
        <p>
           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis,
           nam? Sequi voluptas assumenda repellat sint animi culpa veritatis 
           consectetur, repellendus magnam harum consequuntur beatae cumque 
           reiciendis totam et magni iste?
        </p>
    </div>
  )
}
