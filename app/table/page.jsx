import Link from "next/link";

export default function Table({ table }) {
  const { id, users, testfield, tablename } = table || {};

  return (
    <Link className="button" href={`/table/${id}`}>
      <div>{tablename}</div>
      <div>{testfield}</div>
      <div>Users:</div>
      <div>{users}</div>
    </Link>
  );
}
