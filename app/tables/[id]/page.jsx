import PocketBase from "pocketbase";
import Welcome from "@/app/Welcome";
import ListButton from "./ListButton";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

const pb = new PocketBase("http://45.33.6.9:81");

async function getTable(id) {
  const res = await pb.collection("tables").getOne(id, { expand: "tablename" });
  return res;
}

export default async function TablePage({ params }) {
  const table = await getTable(params.id);

  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col bg-[#343541] w-1/5 h-screen">
          <Welcome />
        </div>
        <div className="flex flex-row w-5/6 bg-[#202123] h-screen">
          <div class="card" className="w-1/2 h-1/2 bg-white">
            <header class="card-header">
              <p class="card-header-title">{table.tablename}</p>
              <button
                class="card-header-icon"
                aria-label="more options"
              ></button>
            </header>
            <div class="card-content">
              <div class="content">{table.testfield}</div>
              <br />
              <div>Wait List:</div>
              <div>
                {table.users.map((user) => {
                  return <div key={user}>{user}</div>;
                })}
              </div>
            </div>
            <footer class="card-footer">
              <ListButton tableId={table.id} tableUsers={table.users} />
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
