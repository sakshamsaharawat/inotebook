import React from 'react'
// import noteContext from '../context/notes/NoteContext'

// const About = () => {
//     // const a = useContext(noteContext)
//     // useEffect(() => {
//     //     a.update()
//     // })
//     return (
//         <div>
//         <h1>This is About Page </h1>
//             {/* <h1>This is About {a.state.name} and he is in class {a.state.class}</h1> */}
//         </div>
//     )
// }
const About = () => {
    return(
        <div> this is about page</div>
    ) 
}

export default About


// before use of useeffect hooks data show like that on ui
//  <h1>This is About {a.name} and he is in class {a.class}</h1>
//  but after we use 
/* <h1>This is About {a.state.name} and he is in class {a.state.class}</h1> */ 
// this above use effect hook is used for update the noteSate
// The useEffect hook is a powerful tool in React function components for handling side effects. It helps you do things like fetch data, update the DOM, and set up subscriptions easily. By learning how to use the dependencies array and cleanup functions, you can efficiently manage your component's lifecycle events.