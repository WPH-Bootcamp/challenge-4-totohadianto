const prompt = require("prompt-sync")({ sigint: true });

let todos = [];

function generateUniqueId() {
    // TODO: Implementasi fungsi untuk menghasilkan ID unik
    // Ini akan digunakan secara internal untuk setiap objek to-do
    // Contoh: Gabungan waktu saat ini dan angka acak
    return Date.now().toString() + Math.floor(Math.random() * 1000).toString();
}

function addTodo() {
    // TODO: Implementasi logika untuk menambah to-do baru
    // 1. Minta input teks to-do dari user menggunakan `prompt()`
    // 2. Validasi input: Pastikan teks tidak kosong atau hanya spasi
    // 3. Buat objek to-do baru dengan properti: id (dari generateUniqueId), text, dan isCompleted (boolean, default false)
    // 4. Tambahkan objek to-do ini ke array `todos`
    // 5. Beri feedback ke user bahwa to-do berhasil ditambahkan
    let TextToDo = prompt("Type your to-do: ");
    if (TextToDo.trim() === "") {
        console.log("Teks to-do tidak boleh kosong.");
        return;
    }
    let newTodo = {
        id: generateUniqueId(),
        text: TextToDo,
        isCompleted: false,
    };
    todos.push(newTodo);
    console.log("Your to-do has been added.");
}

function markTodoCompleted() {
    // TODO: Implementasi logika untuk menandai to-do sebagai selesai
    // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
    listTodos();

    // 2. Minta user memasukkan NOMOR to-do yang ingin ditandai sebagai selesai
    let todoNumber = prompt(
        "Enter the number of the to-do to mark as completed: "
    );
    // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid (1 sampai jumlah to-do)
    let index = parseInt(todoNumber) - 1;
    if (isNaN(index) || index < 0 || index >= todos.length) {
        console.log(
            "Invalid number. Please enter a valid number from the list."
        );
        return;
    }
    // 4. Ubah properti `isCompleted` dari to-do yang dipilih menjadi `true`
    // 5. Beri feedback ke user bahwa to-do berhasil ditandai selesai
    // 6. Tangani kasus jika to-do sudah selesai
    if (!todos[index].isCompleted) {
        todos[index].isCompleted = true;
        console.log("The to-do has been marked as completed.");
    } else {
        console.log("The to-do is already marked as completed.");
    }
}

function deleteTodo() {
    // TODO: Implementasi logika untuk menghapus to-do
    // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
    listTodos();
    // 2. Minta user memasukkan NOMOR to-do yang ingin dihapus
    let todoNumber = prompt("Enter the number of the to-do to delete: ");
    // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid
    let index = parseInt(todoNumber) - 1;
    if (isNaN(index) || index < 0 || index >= todos.length) {
        console.log(
            "Invalid number. Please enter a valid number from the list."
        );
        return;
    }
    // 4. Hapus to-do yang dipilih dari array `todos`
    todos.splice(index, 1);
    // 5. Beri feedback ke user bahwa to-do berhasil dihapus
    console.log("The to-do has been deleted.");
}

function listTodos() {
    // TODO: Implementasi logika untuk menampilkan semua to-do
    // 1. Tampilkan judul daftar (misal: "--- YOUR TO-DO LIST ---")
    // 2. Cek apakah array `todos` kosong. Jika ya, tampilkan pesan "No to-dos to display."
    // 3. Jika tidak kosong, iterasi (loop) melalui array `todos`
    // 4. Untuk setiap to-do, tampilkan nomor urut, status ([DONE] atau [ACTIVE]), dan teks to-do
    //    Contoh format: "1. [ACTIVE] | Belajar JavaScript"
    // 5. Tampilkan garis penutup daftar
    console.log("--- YOUR TO-DO LIST ---");
    if (todos.length === 0) {
        console.log("No to-dos to display.");
    } else {
        todos.forEach((todo, index) => {
            let status = todo.isCompleted ? "[DONE]" : "[ACTIVE]";
            console.log(`${index + 1}. ${status} | ${todo.text}`);
        });
    }
    console.log("-----------------------");
}

function runTodoApp() {
    // TODO: Implementasi logika utama aplikasi (menu interaktif)
    // Ini adalah "otak" aplikasi yang terus berjalan sampai user memilih untuk keluar
    let running = true;
    while (running) {
        // 1. Tampilkan menu perintah yang tersedia (add, complete, delete, list, exit)
        // 2. Minta user memasukkan perintah menggunakan `prompt()`
        console.log("\n--- TO-DO APP MENU ---");
        console.log("1. [add] - Add a new to-do");
        console.log("2. [complete] - Mark a to-do as completed");
        console.log("3. [delete] - Delete a to-do");
        console.log("4. [list] - List all to-dos");
        console.log("5. [exit] - Exit the application");
        let command = prompt(
            "Enter a command inside the square brackets: "
        ).toLowerCase();
        // 3. Gunakan `switch` statement atau `if/else if` untuk memanggil fungsi yang sesuai
        //    berdasarkan perintah yang dimasukkan user
        // 4. Tangani perintah 'exit' untuk menghentikan loop aplikasi
        // 5. Tangani input perintah yang tidak valid
        switch (command) {
            case "add":
                addTodo();
                break;
            case "complete":
                markTodoCompleted();
                break;
            case "delete":
                deleteTodo();
                break;
            case "list":
                listTodos();
                break;
            case "exit":
                running = false;
                console.log("Exiting the application. Thank you!");
                break;
            default:
                console.log("Invalid command. Please try again.");
        }
    }
}

// Jangan ubah bagian di bawah ini. Ini adalah cara Node.js menjalankan fungsi utama
// dan mengekspor fungsi-fungsi untuk pengujian (jika nanti ada).

if (require.main === module) {
    runTodoApp();
}

module.exports = {
    todos,
    generateUniqueId,
    addTodo,
    markTodoCompleted,
    deleteTodo,
    listTodos,
    runTodoApp,
};
