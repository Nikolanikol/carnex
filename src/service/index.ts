import axios from "axios";
import { error } from "console";

    //   `https://api.encar.com/search/car/list/general?count=true&q=${query}&inav=%7CMetadata%7CSort`

// https://carnexproxy.vercel.app/
const DEV = 'http://localhost:9000'
const PROD = 'https://carnexproxy.vercel.app'
const BASE_URL = PROD
const fetchCatalog = async(query:string)=>{
     const res = await axios.get(BASE_URL+ '/catalog', {
        params : {
            q: query
        }
     }
    )

    .then((res) => {

        const data      =  res.data.iNav.Nodes.find(i=>i.DisplayName === '국산여부').Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets
        // console.log(data)
        return data

    })
    .catch(e=>console.log('fetch catalog error', e))
    return res
}

const fetchSubCategory = async(query:string)=>{
     const res = await axios
    .get(
      BASE_URL+'/subcategory',{
        params : {
            q : query
        }
      }
    )
    .then((res) => {

        const data      =  res.data.iNav.Nodes.find(i=>i.DisplayName === '국산여부').Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets
        console.log(data)
        return data

    })
    .catch(e=>console.log('fetch catalog error', e.text))
    return res
}

const fetchGeneration = async(query:string)=>{
     const res = await axios
    .get(
      BASE_URL+`/generation`, {
        params : {
            q : query
        }
      }
    )
    .then((res) => {

        const data      =  res.data.iNav.Nodes.find(i=>i.DisplayName === '국산여부').Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets.find((i) => i.IsSelected === true).Refinements.Nodes[0].Facets
        console.log(data)
        return data

    })
    .catch(e=>console.log('fetch catalog error', e.text))
    return res
}
const fetchSubGeneration = async(query:string)=>{
     const res = await axios
    .get(
      BASE_URL + '/subgeneration', {
        params : {
            q : query
        }
      }
      
    )
    .then((res) => {
        const data      =  res.data.iNav.Nodes.find(i=>i.DisplayName === '국산여부').Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets.find((i) => i.IsSelected === true).Refinements.Nodes[0].Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets
        console.log('subgeneration',data)

        return data

    })
    .catch(e=>console.log('fetch catalog error', e.text))
    return res
}
const fetchSubRow = async(query:string)=>{
     const res = await axios
    .get(
        BASE_URL +  '/subrow', {
            params : {
                q: query
            }
        }
    )
    .then((res) => {

        const data      =  res.data.iNav.Nodes.find(i=>i.DisplayName === '국산여부').Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets.find((i) => i.IsSelected === true).Refinements.Nodes[0].Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets

        return data

    })
    .catch(e=>console.log('fetch catalog error', e.text))
    return res
}
export {
    fetchCatalog,
    fetchSubCategory,fetchGeneration,
    fetchSubGeneration,
    fetchSubRow
}