# Notes -

## typescript project setup-

```
npx create-react-app <app-name> --template typescript
```

### run typescript project

```
npm start
```

## Working with typescript -

### Creating React functions components (React.FC) -

```
import React from 'react';

const Todos: React.FC<{items: string[]}> = () => {
  return (
   ...
  );
};

export default Todos;
```

React.FC makes it clear that this here is a function that acts as a functional components.
to add our custom type we use `< >`.

**to make items optional we can add '?'**

```
import React from 'react';

const Todos: React.FC<{items?: string[]}> = () => {
  return (
   ...
  );
};

export default Todos;
```

### React.FormEvent -

when working with react forms **onSubmit()**, we can use React.FormEvent -

```
const NewTodo = () =>{
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        ...
    };

    return(
        <form onSubmit={submitHandler}>
            <label htmlFor='text'>Todo text</label>
            <input type='text' id='text'/>
            <button>Add Todo</button>
        </form>
    )
}
```

for **onClick()** we have **React.MouseEvent**
for **onSubmit()** we have **React.FormEvent**

### using ref() with typescript -

in normal react project ref() don't give us any error because we don't have extra types there but in case of typescript we need to add type according to whichever component ref() is going to point.

```
const NewTodo: React.FC = () => {
  const todoTextInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = todoTextInputRef.current!.value;
    ...
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor='text'>Todo text</label>
      <input type='text' id='text' ref={todoTextInputRef} />
      <button>Add Todo</button>
    </form>
  );
};
```

for input it will be **HTMLInputElement**
for button it will be **HTMLButtonElement**
for paragraph it will be **HTMLParagraphElement**

**with typescript we also need to specify initial value so we have to use null in useRef()**

**`!.` means we are certain that here we won't be dealing with null so therefore, drill into this object, and give the actual stored non-null value.**

### Managing State & Typescript -

```
const [todos, setTodos] = useState<Todo[]>([])
```
