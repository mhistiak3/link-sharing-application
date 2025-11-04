import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import toast from "react-hot-toast";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLink,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { MdOutlineDragHandle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import linksService from "../appwrite/links.service";
import {
  ERROR_MESSAGES,
  MAX_LINKS,
  SUCCESS_MESSAGES,
} from "../config/constants";
import { getLinks } from "../store/links.slice";
import { isValidURL } from "../utils/helpers";
import SocialLinksDropdown from "./SelectBox";

const AddLinks = () => {
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState([
    {
      id: Date.now(),
      link: "",
      name: "GitHub",
      selectedIcon: "GitHub",
    },
  ]);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(-1);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  let allLinks = useSelector((state) => state.links.Alllinks);
  // Icon mapping
  const iconMapping = {
    GitHub: <FaGithub className="text-xl mr-2" />,
    YouTube: <FaYoutube className="text-xl mr-2" />,
    Facebook: <FaFacebook className="text-xl mr-2" />,
    Instagram: <FaInstagram className="text-xl mr-2" />,
    LinkedIn: <FaLinkedin className="text-xl mr-2" />,
  };

  // Handle input changes for links
  const handleInputChange = (index, event) => {
    const newLinks = links.map((link, i) =>
      i === index ? { ...link, link: event.target.value } : link
    );
    setLinks(newLinks);
  };

  // Add new link
  const addNewLink = () => {
    if (links.length >= MAX_LINKS) {
      toast.error(ERROR_MESSAGES.MAX_LINKS_REACHED);
      return;
    }
    const newLink = {
      id: Date.now(),

      link: "",
      name: "",
      selectedIcon: "",
    };
    setLinks([...links, newLink]);
  };

  const removeLink = (id) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // validation
    const hasEmptyFields = links.some((link) => !link.name || !link.link);
    if (hasEmptyFields) {
      setLoading(false);
      toast.error(ERROR_MESSAGES.EMPTY_FIELDS);
      return;
    }

    // URL validation
    const invalidLinks = links.filter((link) => !isValidURL(link.link));
    if (invalidLinks.length > 0) {
      setLoading(false);
      toast.error(ERROR_MESSAGES.INVALID_URL);
      return;
    }
    try {
      if (allLinks.length === 0) {
        const result = await linksService.createLinks({
          userId: user?.$id,
          Links: JSON.stringify(links),
        });

        if (result?.error) {
          toast.error(result.error);
          setLoading(false);
          return;
        }
        toast.success(SUCCESS_MESSAGES.LINKS_CREATED);
        dispatch(getLinks({ links }));
        setLoading(false);
      } else {
        // update links
        const userId = user?.$id;
        const updatedLinks = JSON.stringify(links);
        const result = await linksService.updateLinks(userId, updatedLinks);

        if (result?.error) {
          toast.error(result.error);
          setLoading(false);
          return;
        }
        toast.success(SUCCESS_MESSAGES.LINKS_UPDATED);
        dispatch(getLinks({ links }));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.message || "An error occurred while saving links");
    }
  };

  const handleSelectBoxToggle = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? -1 : index); // Toggle the dropdown
  };

  useEffect(() => {
    if (allLinks) {
      setLinks(allLinks);
    }
  }, [allLinks]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedLinks = Array.from(links);
    const [removed] = reorderedLinks.splice(result.source.index, 1);
    reorderedLinks.splice(result.destination.index, 0, removed);

    setLinks(reorderedLinks);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-2/3 bg-white px-6 rounded-lg h-full py-8"
    >
      <h2 className="text-2xl font-semibold text-gray-800">
        Customize your links
      </h2>
      <p className="text-gray-600 mb-8 mt-1">
        Add/edit/remove link below and then share all your profiles with the
        world
      </p>
      <div>
        <button
          type="button"
          onClick={addNewLink}
          className="font-semibold text-purple-800 border border-purple-800 px-4 py-2 rounded w-full hover:bg-purple-800 hover:text-white transition-colors"
        >
          + Add new link
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {links.map((link, index) => (
                <Draggable
                  key={link.id}
                  draggableId={link.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-slate-100 rounded-lg p-4 flex justify-between mt-10 flex-col"
                    >
                      <div className="flex justify-between w-full text-gray-600">
                        <button className="flex gap-2 items-center text-md font-medium">
                          <MdOutlineDragHandle /> Link #{index + 1}
                        </button>
                        <button
                          onClick={() => removeLink(link.id)}
                          className="text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="w-full">
                        <h3 className="text-gray-600 mt-5 mb-1">Platform</h3>
                        <SocialLinksDropdown
                          handleSelect={(name) => {
                            const newLinks = [...links];
                            newLinks[index].name = name;
                            newLinks[index].selectedIcon = name;
                            setLinks(newLinks);
                            setOpenDropdownIndex(-1);
                          }}
                          selected={{
                            name: link.name,
                            icon: iconMapping[link.selectedIcon],
                          }}
                          isOpen={openDropdownIndex === index} // Only open for the current link
                          setIsOpen={() => handleSelectBoxToggle(index)} // Toggle open/close
                        />
                      </div>
                      <div className="w-full">
                        <h3 className="text-gray-600 mt-5 mb-1">Link</h3>
                        <div className="relative w-full">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaLink className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            className="block w-full pl-10 pr-5 py-3 border-2 border-gray-300 rounded-md"
                            placeholder="Enter URL"
                            value={link.link}
                            onChange={(e) => handleInputChange(index, e)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="hr border-t border-gray-300 mt-14"></div>

      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className={
            "bg-purple-600 text-white py-2 px-5 font-medium rounded-md hover:bg-purple-700 transition-colors duration-200" +
            (loading ? " cursor-not-allowed" : "")
          }
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default AddLinks;
