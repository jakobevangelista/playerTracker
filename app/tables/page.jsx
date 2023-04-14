import PocketBase from "pocketbase";
import Table from "../table/page";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

const pb = new PocketBase("https://backend.jakobevangelista.com:443");

async function getTables() {
  const res = await pb
    .collection("tables")
    .getList(1, 50, { expand: "testfield" });
  return res.items;
}

export default async function Tables() {
  const tables = await getTables();
  // console.log(tables);

  return (
    <>
      <div>
        {tables.map((table) => (
          // <Table key={table.id} table={table} />
          <Table
            key={table.id}
            tableId={table.id}
            tableUsers={table.users}
            numUsers={table.users.length}
            tableDescription={table.description}
            tableName={table.tablename}
          />
        ))}
      </div>
    </>
  );
}
