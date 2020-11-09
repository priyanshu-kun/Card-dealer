import React, { Component } from "react";
import "./styles.css";
import axios from "axios";
import Card from "./card";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      url: []
    };
  }
  async componentDidMount() {
    const response = await axios.get(
      "https://deckofcardsapi.com/api/deck/new/shuffle"
    );
    console.log(response.data);
    this.setState({ deck: response.data });
  }

  showCards = async () => {
    try {
      // console.log("card id: ", this.state.card_id);
      const response = await axios.get(
        `https://deckofcardsapi.com/api/deck/${this.state.deck.deck_id}/draw`
      );

      if (!response.data.success) {
        throw new Error("No cards left!");
      }

      let cardData = response.data.cards[0];
      let angle = Math.floor(Math.random() * 90 - 45);
      let x = Math.floor(Math.random() * 40 - 20);
      let y = Math.floor(Math.random() * 40 - 20);
      this.setState((st) => ({
        url: [
          ...st.url,
          {
            id: cardData.code,
            image: cardData.image,
            name: `${cardData.suit} - ${cardData.value}`,
            styles: {
              angle,
              x,
              y
            }
          }
        ]
      }));
    } catch (e) {
      alert(e);
    }
  };

  render() {
    return (
      <div className="App">
        <h1 className="deck-title">
          <span role="img" aria-label="this is emoji">
            🃏
          </span>
          Card Dealer
          <span role="img" aria-label="this is emoji">
            🃏
          </span>
        </h1>
        <h2 className="deck-title subtitle">
          A little demo made with react JS.
        </h2>
        <button onClick={this.showCards}>Gimme a card</button>
        <div className="deck">
          {this.state.url !== [] && <Card url={this.state.url} />}
        </div>
      </div>
    );
  }
}

export default App;
