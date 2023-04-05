// "use client";
import PocketBase from "pocketbase";
import Welcome from "../../Welcome";
import ListButton from "./ListButton";
// import {
//   Card,
//   CardBody,
//   Stack,
//   Heading,
//   Text,
//   Divider,
//   CardFooter,
//   Button,
//   ButtonGroup,
// } from "@chakra-ui/react";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

const pb = new PocketBase("https://backend.jakobevangelista.com:443");

async function getTable(id) {
  const res = await pb.collection("tables").getOne(id, { expand: "tablename" });
  return res;
}

export default async function TablePage({ params }) {
  const table = await getTable(params.id);
  // useEffect(() => {
  //   const res = pb.collection("tables").getOne(id, { expand: "tablename" });
  // });

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
      {/* <Card maxW="sm">
        <CardBody>
          <Image
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">Living room Sofa</Heading>
            <Text>
              This sofa is perfect for modern tropical spaces, baroque inspired
              spaces, earthy toned spaces and for people who love a chic design
              with a sprinkle of vintage design.
            </Text>
            <Text color="blue.600" fontSize="2xl">
              $450
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              Buy now
            </Button>
            <Button variant="ghost" colorScheme="blue">
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card> */}
    </>
  );
}
