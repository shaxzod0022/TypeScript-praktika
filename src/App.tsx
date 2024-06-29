import style from "./App.module.css";
import { useState, ChangeEvent } from "react";
import { iData } from "./interface";
import { data } from "./constants";

const App = (): JSX.Element => {
  const [arr, setArr] = useState<iData[]>(data);
  const [value, setValue] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const handleSubmit = (): void => {
    if (!value?.length) return;
    if (editIndex !== null) {
      updateTask(editIndex, value);
    } else {
      let newData: iData = {
        title: value,
        id: arr.length,
        description: "Description",
        complated: false,
      };
      setArr([...arr, newData]);
    }
    setValue("");
    setEditIndex(null);
  };

  const handleEdit = (index: number) => {
    setValue(arr[index].title);
    setEditIndex(index);
  };

  const updateTask = (index: number, newTitle: string) => {
    const updatedArr = arr.map((item, i) =>
      i === index ? { ...item, title: newTitle } : item
    );
    setArr(updatedArr);
  };

  const deleteTask = (id: number): void => {
    let delTask = arr.filter((item) => item.id !== id);
    setArr(delTask);
  };

  return (
    <div className={style.todo}>
      <h1 className={style.title}>Todo</h1>
      <input
        type="text"
        placeholder="Enter Task"
        className={style.input}
        value={value}
        onChange={changeHandler}
      />
      <button onClick={handleSubmit} className={style.button}>
        {editIndex !== null ? "Update Task" : "Add Task"}
      </button>
      <div className={style.card}>
        {arr.map((item, i) => {
          return (
            <div key={item.id} className={style.cardItem}>
              <p>{item.title}</p>
              <div className={style.delBtn}>
                <button
                  onClick={() => handleEdit(i)}
                  className={style.editButton}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(item.id)}
                  className={style.editButton}
                >
                  Del
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
