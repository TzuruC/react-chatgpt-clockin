import React, { useState, useEffect } from 'react';
import './App.css';

function App() { 

  // const [tasks, setTasks] = useState([
  //   { name: '刷馬桶', frequency: 5, lastCompleted: null },
  //   { name: '洗衣機內槽清潔', frequency: 30, lastCompleted: null },
  //   { name: '紙類回收', frequency: 14, lastCompleted: null },
  //   { name: '塑膠類回收', frequency: 30, lastCompleted: null },
  //   { name: '拖地', frequency: 3, lastCompleted: null },
  // ]);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // 檢查 tasks 是否為空，如果是，則新增第一筆資料為今天日期
    if (tasks.length === 0) {
      const today = new Date();
      setTasks([
        {
          name: '刷馬桶',
          frequency: 5,
          lastCompleted: today,
        },
        {
          name: '洗衣機內槽清潔',
          frequency: 30,
          lastCompleted: today,
        },
        {
          name: '紙類回收',
          frequency: 14,
          lastCompleted: today,
        },
        {
          name: '塑膠類回收',
          frequency: 30,
          lastCompleted: today,
        },
        {
          name: '拖地',
          frequency: 3,
          lastCompleted: today,
        },
      ]);
    }
  }, [tasks]);

  const handleCompletion = (index) => {
    const newTasks = [...tasks];
    const today = new Date();
    const lastCompleted = newTasks[index].lastCompleted || today;
    const frequency = newTasks[index].frequency;
  
    const newDate = new Date(lastCompleted);
    newDate.setDate(newDate.getDate() + frequency);
  
    newTasks[index].lastCompleted = today;
    setTasks(newTasks);
  };
  
  const handleDelay = (index) => {
    const newTasks = [...tasks];
    const lastCompleted = newTasks[index].lastCompleted;
    const frequency = newTasks[index].frequency;

    const newDate = new Date(lastCompleted);
    newDate.setDate(newDate.getDate() + Math.ceil(frequency / 2));

    newTasks.push({
      ...newTasks[index],
      lastCompleted: newDate,
    });

    setTasks(newTasks);
  };

  return (
    <div className="App">
      <h1>家事打卡板</h1>
      <div className="tabs">
        {tasks.map((task, index) => (
          <div key={index} className="tab">
            <h2>{task.name}</h2>
            <table>
              <thead>
                <tr>
                  <th>執行日期</th>
                  <th>驗收完成</th>
                </tr>
              </thead>
              <tbody>
                {task.lastCompleted && (
                  <tr>
                    <td>{task.lastCompleted.toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => handleCompletion(index)}>完成</button>
                      <button onClick={() => handleDelay(index)}>延後</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
