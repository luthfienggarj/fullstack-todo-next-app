import { ConnectDB } from "@/lib/config/db";
import TodoModel from "@/lib/models/TodoModel";
import { NextResponse } from "next/server";

// Fungsi untuk menghubungkan ke database MongoDB
const LoadDB = async () => {
    // Menunggu koneksi ke database
    await ConnectDB();
}

LoadDB(); // Memanggil fungsi untuk menghubungkan ke database


// Fungsi untuk meng-handle HTTP GET request
export async function GET (request) {

    // Setelah klik submit button maka kotak title dan description ter-reset
    const todos = await TodoModel.find({})

    // Mengembalikan respons JSON dengan pesan bahwa metode GET telah diakses
    return NextResponse.json({todos: todos})
}

// Fungsi untuk meng-handle HTTP POST request
export async function POST (request) {
    // Mendapatkan data JSON dari body request
    const {title, description} = await request.json();

    // Membuat entri baru dalam database menggunakan model TodoModel
    await TodoModel.create({
        title, // Menyimpan title dari request
        description // Menyimpan description dari request
    })

    // Mengembalikan respons JSON dengan pesan bahwa todo telah berhasil dibuat
    return NextResponse.json({msg: "Todo Created"})
}

// Fungsi untuk meng-handle HTTP DELETE request
export async function DELETE (request) {
    // Button Delete Todo
    const mongoId = await request.nextUrl.searchParams.get('mongoId');
    await TodoModel.findByIdAndDelete(mongoId);

    // Mengembalikan respons JSON dengan pesan bahwa todo telah berhasil dibuat
    return NextResponse.json({msg: "Todo Deleted"})
}

// Fungsi untuk meng-handle HTTP PUT request
export async function PUT (request) {
    // Button Clear Todo
    const mongoId = await request.nextUrl.searchParams.get('mongoId');
    await TodoModel.findByIdAndUpdate(mongoId, {
        $set: {
            isCompleted: true
        }
    });

    // Mengembalikan respons JSON dengan pesan bahwa todo telah berhasil dibuat
    return NextResponse.json({msg: "Todo Completed"})
}