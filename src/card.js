import React, { Component } from "react";

class Card extends Component {
  render() {
    return (
      <>
        {this.props.url.map((card) => {
          return (
            <img
              style={{
                transform: `translate(${card.styles.x}px,${card.styles.y}px) rotate(${card.styles.angle}deg)`
              }}
              className="Card"
              key={card.id}
              src={card.image}
              alt={card.name}
            />
          );
        })}
      </>
    );
  }
}

export default Card;
