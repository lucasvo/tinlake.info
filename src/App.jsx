import React from 'react'
import './App.css'
import logo from './logo.svg'

//import mainnetPools from '@centrifuge/tinlake-pools-mainnet'
//import contractsABI from './dapp.sol.json'
import {gql, useQuery} from '@apollo/client'
import ethers from 'ethers'
import { Line } from 'react-chartjs-2';

//function loadPools() {
//  return mainnetPools.filter((pool) => pool.version == 3 && pool.addresses != null);
//}

const dailyPool = gql`
query {
  days {
    id
    reserve
    assetValue
  }
}`



let parseDecimal = (str) => {
  return ethers.BigNumber.from(str).div(ethers.BigNumber.from("1000000000000000000")).toString();
}

let parseDate = (str) => {
  let date = new Date(parseInt(str)*1000)
  return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
}


class AssetValueAreaChart extends React.Component {
    prepareData () {
      let labels = []
      let assetValue = []
      let reserve = []
      this.props.data.days.forEach((d, i) => {
        labels.push(parseDate(d.id))
        assetValue.push(parseDecimal(d.assetValue))
        reserve.push(parseDecimal(d.reserve))
      })

      return {
        labels: labels,
        datasets: [
          {
            label: "Asset Value",
            data: assetValue,
            lineTension: 0,
            pointRadius:0,
            backgroundColor: 'rgba(39, 98, 255, 0.9)'
          },
          {
            label: "Reserve",
            data: reserve,
            lineTension: 0,
            pointRadius:0,
            backgroundColor: 'rgba(39, 98, 255, 0.5)'
          },
        ]
      }
    }
    prepareOptions() {
        return {
            maintainAspectRatio: false, // Don't maintain w/h ratio
            scales: {
              yAxes: [{
                stacked: true
              }]
            }
          }
    }
    render() {
        return (
            <div className="assetValueChart">
                <Line data={this.prepareData()} options={this.prepareOptions()} />
            </div>
        )
    }
}

function App() {
    const {loading, data} = useQuery(dailyPool)
    if (loading) {
      return (<h1>Loading</h1>)
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1><img src={logo} alt=""/>tinlake.info</h1>
      </header>
      <AssetValueAreaChart data={data}/>
      <a href="https://tinlake.centrifuge.io">tinlake.centrifuge.io</a>
      </div>
    )
}

export default App;
