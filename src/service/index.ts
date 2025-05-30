import axios from "axios";
import { error } from "console";

    //   `https://api.encar.com/search/car/list/general?count=true&q=${query}&inav=%7CMetadata%7CSort`

// https://carnexproxy.vercel.app/
const fetchCatalog = async(query:string)=>{


    try {
         const res = await fetch(
      `https://api.encar.com/search/car/list/general?count=true&q=${query}&inav=%7CMetadata%7CSort`,{
        headers: {
          "user-agent":
            "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
        },
      }
    )
    .then(data=>data.json())
    .then((res) => {

        const data      =  res.iNav.Nodes.find(i=>i.DisplayName === '국산여부').Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets

        return data

    })
    return res
    } catch (error) {
        const res =  fetch(`https://encar-proxy.habsida.net/api/nav?count=true&q=${query}&inav=%7CMetadata%7CSort`)
        .then(data=>data.json())
        .then((res) => {

        const data      =  res.iNav.Nodes.find(i=>i.DisplayName === '국산여부').Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets
            console.log(data)
        return data

    })
        return res

    }
    

    
    // .catch(()=>{
              
    
}

const fetchSubCategory = async(query:string)=>{

    try {
         const res = await fetch(
      `https://api.encar.com/search/car/list/general?count=true&q=${query}&inav=%7CMetadata%7CSort`,{
        headers: {
          "user-agent":
            "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
        },
      }
    )
    .then(data=>data.json())
    .then((res) => {

        const data      =  res.iNav.Nodes.find(i=>i.DisplayName === '국산여부').Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets
        console.log(data)
        return data

    })
        return res

    } catch (error) {
        
  const res =  fetch(`https://encar-proxy.habsida.net/api/nav?count=true&q=${query}&inav=%7CMetadata%7CSort`)
        .then(data=>data.json())
    .then((res) => {

        const data      =  res.iNav.Nodes.find(i=>i.DisplayName === '국산여부').Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets

        return data

    })
    return res
    }
    

}

const fetchGeneration = async(query:string)=>{
    try {
        const res = await fetch(
      `https://api.encar.com/search/car/list/general?count=true&q=${query}&inav=%7CMetadata%7CSort`, {
        headers: {
          "user-agent":
            "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
        },
      }
    )
    .then(data=>data.json())
    .then((res) => {

        const data      =  res.iNav.Nodes.find(i=>i.DisplayName === '국산여부').Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets.find((i) => i.IsSelected === true).Refinements.Nodes[0].Facets
        console.log(data)
        return data

    })

    return res
    } catch (error) {
         const res =  fetch(`https://encar-proxy.habsida.net/api/nav?count=true&q=${query}&inav=%7CMetadata%7CSort`)
        .then(data=>data.json())
    .then((res) => {
        const data      =  res.iNav.Nodes.find(i=>i.DisplayName === '국산여부').Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets.find((i) => i.IsSelected === true).Refinements.Nodes[0].Facets
        console.log(data)
        return data

    })
    return res
    }
     
}
const fetchSubGeneration = async(query:string)=>{

    try {
        const res = await fetch(
      `https://api.encar.com/search/car/list/general?count=true&q=${query}&inav=%7CMetadata%7CSort`, {
        headers: {
          "user-agent":
            "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
        },
      }

    )
    .then(data=>data.json())
    .then((res) => {

        const data      =  res.iNav.Nodes.find(i=>i.DisplayName === '국산여부').Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets.find((i) => i.IsSelected === true).Refinements.Nodes[0].Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets


        return data

    })

    return res
    } catch (error) {
          const res =  fetch(`https://encar-proxy.habsida.net/api/nav?count=true&q=${query}&inav=%7CMetadata%7CSort`)
        .then(data=>data.json())
 .then((res) => {

        const data      =  res.iNav.Nodes.find(i=>i.DisplayName === '국산여부').Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets.find((i) => i.IsSelected === true).Refinements.Nodes[0].Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets


        return data

    })

        return res
    }
     
}
const fetchSubRow = async(query:string)=>{

    try {
          const res = await fetch(
      `https://api.encar.com/search/car/list/general?count=true&q=${query}&inav=%7CMetadata%7CSort`,{
        headers: {
          "user-agent":
            "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
        },
      }
    )
    .then(data=>data.json())
    .then((res) => {

        const data      =  res.iNav.Nodes.find(i=>i.DisplayName === '국산여부').Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets.find((i) => i.IsSelected === true).Refinements.Nodes[0].Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets

        return data

    })

    return res
    } catch (error) {
            const res =  fetch(`https://encar-proxy.habsida.net/api/nav?count=true&q=${query}&inav=%7CMetadata%7CSort`)
        .then(data=>data.json())
        .then((res) => {

        const data      =  res.iNav.Nodes.find(i=>i.DisplayName === '국산여부').Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets.find((i) => i.IsSelected === true).Refinements.Nodes[0].Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets
            console.log(data)
        return data

    })

        return res
    }
   
}
export {
    fetchCatalog,
    fetchSubCategory,fetchGeneration,
    fetchSubGeneration,
    fetchSubRow
}