import React from 'react';
import Searchbar from './searchbar.jsx';
import Dropdown from './dropdown.jsx';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shopItems: [],
      haveData: false,
      filteredText: '',
      dropdownValue: '',
      allItems: []
    }
  }

  componentWillMount() {
    fetch(`https://my-json-server.typicode.com/Patyyyk/Furniture-store/db`).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        console.log('Error');
      }
    }).then(db => db.chairs.concat(db.sofas, db.beds)).then(db => this.setState({shopItems: db, haveData: true}))

    fetch(`https://my-json-server.typicode.com/Patyyyk/Furniture-store/db`).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        console.log('Error');
      }
    }).then(db => this.setState({allItems: db}))

  }
  changeAppState = (filteredText) => {
    this.setState({filteredText: filteredText})
  }

  categoryPick = (dropdownValue) => {
    this.setState({dropdownValue: dropdownValue})
  }

  render() {
    console.log(this.state.dropdownValue)
    return this.state.haveData && (<div>
      <form className='d-flex justify-content-center'>
      <Searchbar changeAppState={this.changeAppState}/>
      <Dropdown categoryPick={this.categoryPick}/>
      </form>
      <hr/>
      <div className='w-100 h-100 d-flex flex-row flex-wrap justify-content-center overflow'>
        {
          this.state.shopItems.map((element) => {
            if (element.name.toLowerCase().indexOf(this.state.filteredText.toLowerCase()) != -1) {
              return (<div key={element.id} className='items-size'>
                <div className='rounded w-100 h-100' style={{
                    background: `url(${element.url})`,
                    backgroundSize: 'cover'
                  }}></div>
                <p>Model:{element.name}</p>
              </div>);
            }
          })
        }
      </div>
    </div>);
  }
}
export default Products;
