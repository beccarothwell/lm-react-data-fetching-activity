import { ChangeEvent } from "react";
import { PoemData, PoemsResponse } from "./poem_container";

interface PoemProps {
  poem: PoemData;
  setPoems: React.Dispatch<React.SetStateAction<PoemsResponse>>;
}

export const Poem: React.FC<PoemProps> = ({
  poem: { id, title, body, author, isLiked },
  setPoems,
}) => {
  async function updatePoemIsLiked(e: ChangeEvent<HTMLInputElement>) {
    try {
      const response = await fetch(`/poetriumph.com/api/v1/poems`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Number(e.target.id),
          isLiked: e.target.checked,
        }),
      });

      if (response.ok) {
        const updatedPoem = await response.json();
        setPoems((currentPoems) =>
          currentPoems.map((poem) =>
            poem.id === updatedPoem.id ? updatedPoem : poem
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <li key={id} className="poem-item">
        <h3>{title}</h3>
        <p className="poem-text">{body}</p>
        <p>{author}</p>
        <label>
          Like:{" "}
          <input
            className="tick-box"
            type="checkbox"
            id={id.toString()}
            checked={isLiked}
            onChange={updatePoemIsLiked}
          />
        </label>
      </li>
    </>
  );
};
