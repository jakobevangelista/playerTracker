import PocketBase from "pocketbase";
import Link from "next/link";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

const pb = new PocketBase("http://45.33.6.9:81");

async function getTables() {
  const res = await pb
    .collection("tables")
    .getList(1, 50, { expand: "testfield" });
  return res.items;
}

async function getUser(id) {
  const res = await pb.collection("users").getOne(id, { expand: "name" });
  return res;
}

export default async function Tables() {
  const tables = await getTables();
  // console.log(tables);
  //   console.log(tables);
  //   console.log(tables[1].users[0]);
  const user1 = await getUser(tables[1].users[0]);
  //   console.log(user1);
  return (
    <>
      <div>
        {tables.map((table) => (
          <Table key={table.id} table={table} />
        ))}
      </div>
    </>
  );
}

function Table({ table }) {
  const { id, users, testfield, tablename } = table || {};

  return (
    <Link className="button" href={`/tables/${id}`}>
      <div>{tablename}</div>
    </Link>
  );
}
