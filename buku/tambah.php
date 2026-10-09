<!--
PDF Jobsheet 7 merujuk file ini dan menunjukkan bahwa form menggunakan:
<form id="form-tambah" method="post" action="proses_tambah.php">
Isi lengkap halaman tambah.php tidak dicantumkan dalam teks PDF yang tersedia.
-->
<?php
$page_title = "Tambah Buku";
include __DIR__ . '/../includes/header.php';
?>

<section>
    <h2>Tambah Buku</h2>
    <form id="form-tambah" method="post" action="proses_tambah.php">
        <label>Judul <input type="text" name="judul"></label>
        <label>Pengarang <input type="text" name="pengarang"></label>
        <label>Tahun <input type="number" name="tahun"></label>
        <label>ISBN <input type="text" name="isbn"></label>
        <label>Stok <input type="number" name="stok" min="0"></label>
        <label>Kategori <input type="text" name="kategori"></label>
        <button type="submit">Simpan</button>
    </form>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
