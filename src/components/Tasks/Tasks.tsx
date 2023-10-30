"use client"

import { IconPlus, IconTrash, IconSquareRoundedCheck } from "@tabler/icons-react"
import { useState } from "react"

interface AllTasks {
    id: number,
    value: string,
    isFinished: boolean,
}

function Tasks () {

    const [task, setTask] = useState<string>("")
    const [allTasks, setAllTasks] = useState<AllTasks[]>([])

    const handleSubmit = (ev: any) => {
        ev.preventDefault()

        const newTask = {
            id: Math.floor(Math.random() * 100000),
            value: task,
            isFinished: false
        }

        setAllTasks(
            [newTask, ...allTasks]
        )

        setTask("")
    }

    const removeTask = (taskId: number) => {
        setAllTasks(allTasks.filter((task) => task.id !== taskId))
    }
    
    const finishTask = (taskId: number) => {
        setAllTasks(prevTasks => prevTasks.map((task) => 
            task.id === taskId ? {...task, isFinished: !task.isFinished} : task
        ));
    }


    return (
        <div className="bg-sky-900 p-8 rounded-md flex flex-col flex-wrap">
            <h1 className="text-3xl text-center mb-5">Lista de Tarefas</h1>
            <form onSubmit={handleSubmit} className="flex items-center flex-wrap gap-5">
                <input 
                    type="text" 
                    placeholder="Tarefa ..."
                    className="bg-sky-700 outline-none py-1 px-2 rounded-md"
                    value={task}
                    onChange={(ev) => setTask(ev.target.value)}
                />
                <button className="bg-sky-700 flex items-center justify-center gap-1 px-2 py-1 rounded-md hover:scale-105 hover:brightness-110" type="submit"><IconPlus />Adicionar</button>
            </form>


            <div className="mt-10 flex flex-col gap-5">
                {allTasks.length <= 0 ? (
                    <p className="text-center mt-[-10px]">
                        Nenhuma tarefa foi adicionada ainda...
                    </p>
                ) : (
                    allTasks.map((task) => (
                        <div key={task.id} className={`w-full flex justify-between items-center bg-sky-700 p-3 rounded-md ${task.isFinished ? "bg-green-500" : "bg-sky-700"}`}>
                            <p>{task.value}</p>
                            <div className="flex items-center gap-2">
                                <button onClick={() => finishTask(task.id)}><IconSquareRoundedCheck/></button>
                                <button onClick={() => removeTask(task.id)}><IconTrash/></button>
                            </div>
                        </div>
                    ))
                )}   
            </div>
        </div>
    )
}

export default Tasks