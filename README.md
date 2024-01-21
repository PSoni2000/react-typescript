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

### Managing State & TypeScript -

```
const [todos, setTodos] = useState<Todo[]>([])
```

### useContext() with TypeScript

#### Creating context -

```
// JavaScript syntax -
// const contextName = React.createContext(<InitialValue>)

// TypeScript syntax -

type TodosContextObj = {
  items: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
};

export const TodosContext = React.createContext<TodosContextObj>({
  items: [],
  addTodo: () => {},
  removeTodo: (id: string) => {},
});
```

#### Passing context to children components

```
const TodosContextProvider: React.FC = (props) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodoHandler = (todoText: string) => {
    const newTodo = new Todo(todoText);

    setTodos((prevTodos) => {
      return prevTodos.concat(newTodo);
    });
  };

  const removeTodoHandler = (todoId: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== todoId);
    });
  };

  const contextValue: TodosContextObj = { // adding TodosContextObj type
    items: todos,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
};
```

#### Accessing context -

```
const Todos: React.FC = () => {
  const todosCtx = useContext(TodosContext);

  return (
    <ul className={classes.todos}>
      {todosCtx.items.map((item) => (
        <TodoItem
          key={item.id}
          text={item.text}
          onRemoveTodo={todosCtx.removeTodo.bind(null, item.id)}
        />
      ))}
    </ul>
  );
};
```

## tsconfig.json

```
{
	"compilerOptions": {
		"target": "es5", // code will be transformed in this javascript version
		"lib": ["dom", "dom.iterable", "esnext"], // types known out of the box by our Typescript code.
		"allowJs": true,  // could include just ".js" files
		"skipLibCheck": true,
		"esModuleInterop": true,
		"allowSyntheticDefaultImports": true,
		"strict": true, // means we can't have any implicit values (eg- if we remove the type we get error)
		"forceConsistentCasingInFileNames": true,
		"noFallthroughCasesInSwitch": true,
		"module": "esnext",
		"moduleResolution": "node",
		"resolveJsonModule": true,
		"isolatedModules": true,
		"noEmit": true,
		"jsx": "react-jsx"
	},
	"include": ["src"]
}
```
