import axios from "axios";

async function seedGallery() {
  for (let i = 1; i <= 100; i++) {
    await axios.post("http://localhost:4400/gallery/create", {
      title: `Gallery ${i}`,
      imgUrl: "https://picsum.photos/id/1042/600/400,https://picsum.photos/id/1084/600/400",
      date: "2026-04-24"
    });

    console.log(`Inserted ${i}`);
  }

  console.log("Done");
}

seedGallery();