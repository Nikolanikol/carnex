import axios from "axios";



const fetchCatalog = async(query:string)=>{
     const res = await axios
    .get(
      `https://api.encar.com/search/car/list/general?count=true&q=${query}&inav=%7CMetadata%7CSort`
    )
    .then((res) => {

        const data      =  res.data.iNav.Nodes.find(i=>i.DisplayName === '국산여부').Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets
        // console.log(data)
        return data

    })
    .catch(e=>console.log('fetch catalog error', e.text))
    return res
}

const fetchSubCategory = async(query:string)=>{
     const res = await axios
    .get(
      `https://api.encar.com/search/car/list/general?count=true&q=${query}&inav=%7CMetadata%7CSort`
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
      `https://api.encar.com/search/car/list/general?count=true&q=${query}&inav=%7CMetadata%7CSort`
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
      `https://api.encar.com/search/car/list/general?count=true&q=${query}&inav=%7CMetadata%7CSort`
    )
    .then((res) => {

        const data      =  res.data.iNav.Nodes.find(i=>i.DisplayName === '국산여부').Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets.find((i) => i.IsSelected === true).Refinements.Nodes[0].Facets.find(i=>i.IsSelected === true).Refinements.Nodes[0].Facets

        return data

    })
    .catch(e=>console.log('fetch catalog error', e.text))
    return res
}
const fetchSubRow = async(query:string)=>{
     const res = await axios
    .get(
      `https://api.encar.com/search/car/list/general?count=true&q=${query}&inav=%7CMetadata%7CSort`
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