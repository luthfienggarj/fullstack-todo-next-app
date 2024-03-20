"use client"
import Todo from "@/Components/Todo";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

  // State untuk Form Title dan Description
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // State menjabarkan todo di UI Interface
  const [todoData, setTodoData] = useState([]);

  // Mengambil semua data pada api yang akan di cantumkan ke UI Interface
  const fetchTodos = async () => {
    const response = await axios('/api');
    setTodoData(response.data.todos); // response.data.todos todos karena pada thunder client bernama todos
  }

  // Delete Button
  const deleteTodo = async (id) => {
    const response = await axios.delete('/api', {
      params: {
        mongoId: id
      }
    })
    // Keterangan bahwa todo telah berhasil dihapus
    toast.success(response.data.msg);
    fetchTodos()
  }

  // Complete Button
  const completeTodo = async (id) => {
    const response = await axios.put('/api', {}, {
      params: {
        mongoId: id
      }
    })
    // Keterangan bahwa todo telah berhasil completed
    toast.success(response.data.msg);
    // Agar perubahan pada UI Interface bisa terjadi
    fetchTodos();
  }

  // Perubahan pada fetchTodos
  useEffect(() => {
    fetchTodos();
  }, []) // [] kosong karena saya mau di execute 1 kali


  // Menjabarkan name dan value agar form bekerja sebagaimana mestinya
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(form => ({ ...form, [name]: value }));
    console.log(formData);
  }

  // Saat Klik Button, Website Tidak Akan Ter-Refresh / Ter-Reload
  const submitHandler = async (e) => {
    e.preventDefault(); // hindari default behavior dari form submission

    try {
      // Lakukan request POST ke API
      const response = await axios.post('/api', formData);

      // Jika respons dari server berhasil diterima, tampilkan notifikasi toast
      toast.success(response.data.msg);

      // Setelah klik submit button maka kotak title dan description ter-reset
      setFormData({
        title: "",
        description: "",
      });

      // Menampilkan Todo yang baru di buat ke dalam List Todo di UI Interface
      await fetchTodos();

    } catch (error) {
      // Jika terjadi error pada request, tampilkan notifikasi error
      toast.error("Error");
    }
  }

  return (
    <>
      <ToastContainer theme="dark" />
      {/* --- onSubmit harus diletakan di form agar berfungsi dengan baik --- */}
      <form onSubmit={submitHandler} className="flex items-start flex-col gap-1 w-[80%] max-w-[600px] mt-24 px-2 mx-auto">

        <input
          type="text"
          name="title"
          placeholder="Enter Title"
          className="px-3 py-2 border-2 border-s-red-600 w-full"
          value={formData.title}
          onChange={onChangeHandler}
        />

        <textarea
          name="description"
          placeholder="Enter Description"
          className="px-3 py-2 border-2 border-s-gray-400 w-full"
          value={formData.description}
          onChange={onChangeHandler}></textarea>

        <button
          type="submit"
          className="bg-orange-600 py-3 px-11 text-white rounded-md"
        >Add Todo</button>
      </form>

      {/* --- Table Todo --- */}
      <div className="relative overflow-x-auto w-[60%] mx-auto mt-[60px]">
        <table className="w-full text-sm text-left rtl:text-right dark:text-gray-400">
          <thead className="text-xs text-gray-900 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {todoData.map((item, index) => {
              {/* --- Menggunakan Props yang akan di lempar ke Todo.Jsx --- */ }
              return <Todo key={index} id={index} title={item.title} description={item.description} complete={item.isCompleted} mongoId={item._id} deleteTodo={deleteTodo} completeTodo={completeTodo} />
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
