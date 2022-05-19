const Course = ({ course }) => {

    var total = course.parts.reduce(function(sum, part) {
      return sum + part.exercises
        }, 0)
    
    return (
      <div>
        <h2>{course.name}</h2>
    
        <ul>
        {course.parts.map(part =>
      <li key={part.id}>
        {part.name} {part.exercises}
      </li>)}
        </ul>
    
        <h3>total of {total} exercises</h3>
    
      </div>
    )
    }

export default Course