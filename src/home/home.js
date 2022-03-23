import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import './home.css';
import SearchIcon from '@material-ui/icons/Search';

class Home extends Component {
    state = {
        finData: [],
        displayData: [],
    }

    componentDidMount = () => {
        fetch("sampleData.json").then(res => res.json()).then(response => {
            this.setState({
                finData: response,
                displayData: response
            })
        })
    }
   
    sortData = (column) => {
        const custArr = this.state.finData;
        switch(column) {
            case 'Asset':let assetSort = custArr.sort((a, b) => {
                            if(a.assetClass < b.assetClass) return 1;
                            else if(a.assetClass > b.assetClass) return -1;
                            else return 0;
                        });
                        assetSort = custArr.sort((a, b) => {
                            if(a.assetClass === 'Equities' || a.assetClass === 'Macro'){
                                if(a.assetClass > b.assetClass) return 1;
                                else if(a.assetClass < b.assetClass) return -1;
                                else return 0;
                            }
                        });
                        this.setState({displayData: assetSort});
                        break;

            case 'Price': let priceSort = custArr.sort((a, b) => {
                             return parseInt(b.price) - parseInt(a.price);
                        });
                        this.setState({displayData: priceSort});
                        break;
                        
            case 'Ticker': let tickerSort = custArr.sort((a, b) => {
                            if(a.ticker > b.ticker) return 1;
                            else if(b.ticker > a.ticker) return -1;
                            else return 0;
                        });
                        this.setState({displayData: tickerSort});
                        break;
            default:  console.log('Default data'); 
        }
        
    }


    searchHandler = (event) => {
        console.log("query" + event);
        if (event === '') {
            this.setState({
                displayData: this.state.finData
            });
        } else {
            let returnRow = [];
            let finData = this.state.finData
            finData.filter((row, index) => {
                let currentIndex = -1;
                let rowValues = Object.values(row);
                rowValues.forEach((value) => {
                    if (event !== '' &&
                        typeof (value) !== "number" && value.toLowerCase().includes(event)
                        && currentIndex !== index) {
                        currentIndex = index;
                        console.log('row->', row, index);
                        returnRow.push(row);
                        return true;
                    }
                });
                return;
            });
            this.setState({
                displayData: returnRow
            });
        }
    }
    render() {
        const custArr = this.state.displayData;
       
        return (
            <div className="container home-container">
                <div className="searchBar">
                    <span style={{ padding: '0px 10px 0px 10px' }}>Search</span>
                    <input type="text" onChange={e => this.searchHandler(e.target.value)} />
                    <span className="searchIcon"><SearchIcon></SearchIcon></span>
                </div>
                <table id="finTable">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Asset Class<Button onClick={() => this.sortData('Asset')}><SortIcon></SortIcon></Button></td>
                            <td>Ticker<Button onClick={() => this.sortData('Ticker')}><SortIcon></SortIcon></Button></td>
                            <td>Price<Button onClick={() => this.sortData('Price')}><SortIcon></SortIcon></Button></td>
                        </tr>
                    </thead>
                    <tbody>
                        {custArr.map((data,i) => (
                            <tr key={i} className={this.setCSSClass(data.assetClass)}>
                                <td>{i+1}</td>
                                <td>{data.assetClass}</td>
                                <td>{data.ticker}</td>
                                <td className={this.setPrice(data.price)}>{data.price}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }

    setCSSClass(asset){
        console.log("Set CSS");
        let asssetclass = '';
        if (asset === 'Credit'){
            asssetclass = 'Credit';
        } else if (asset === 'Macro'){
            asssetclass = 'Macro';
        } else {
            asssetclass = 'Equities';
        }
        return asssetclass;
    }

    setPrice(price){
        if(price < 0){
            return 'textRed';
        }
    }
    
}

export default Home;