import { PoemsResponse } from "./poem_container";
import { Poem } from "./poem";
import { ShowLoading } from "./show_loading";

interface PoemsListProps {
  poems: PoemsResponse;
  isLoading: boolean;
  setPoems: React.Dispatch<React.SetStateAction<PoemsResponse>>;
}

export const PoemsList: React.FC<PoemsListProps> = ({
  poems,
  isLoading,
  setPoems,
}) => {
  // receive the data on props and map over it here
  // you can use the Poem component for each item in the list
  return (
    <>
      {isLoading ? (
        <ShowLoading />
      ) : (
        poems.map((poem) => (
          <Poem key={poem.id} poem={poem} setPoems={setPoems} />
        ))
      )}
    </>
  );
};
