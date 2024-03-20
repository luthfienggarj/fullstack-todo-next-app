import React from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";

const Todo = ({ id, title, description, mongoId, complete, deleteTodo, completeTodo }) => {
    return (
        <tr className="bg-white border-b">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {id + 1}
            </th>
            <td className={`px-6 py-4 text-gray-500 ${complete ? 'line-through' : 'no-underline'}`}>
                {title}
            </td>
            <td className={`px-6 py-4 text-gray-500 ${complete ? 'line-through' : 'no-underline'}`}>
                {description}
            </td>
            <td className={`px-6 py-4 text-gray-500 ${complete ? 'line-through' : 'no-underline'}`}>
                {complete ? "Completed" : "On Progress"}
            </td>
            <td className="px-6 py-4">
                {complete ? "" : 
                <button onClick={() => completeTodo(mongoId)} className='py-2 px-2 border-2 border-orange-200 bg-orange-200 rounded-lg hover:bg-orange-300 mr-2'>
                    <MdOutlineDone className='text-xl text-gray-900'/>
                </button>
                }
                
                <button onClick={() => deleteTodo(mongoId)} className='py-2 px-2 border-2 border-orange-500 bg-orange-500 rounded-lg hover:bg-orange-600'>
                    <MdDeleteOutline className='text-xl text-white'/>
                </button>
            </td>
        </tr>
    )
}

export default Todo