import { useContext, useState } from 'react';
import { templatesIcon1 } from '../assets';
import { templates } from '../resumes';
import { closeIcon } from '../assets';
import { ChatbotContext } from '../app/Context/ChatBotContext';

const TemplateSelector = () => {
  const { setSelectedTemplate } = useContext(ChatbotContext);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white relative flex items-center justify-center rounded-lg cursor-pointer">
      <div
        className="flex items-center justify-center w-full h-full overflow-hidden font-albert py-2 px-4"
        onClick={() => setIsOpen(true)}
      >
        {' '}
        <img src={templatesIcon1} className="w-[25px] h-[25px]" alt="" />
        <span className="font-semibold text-base">Templates</span>
      </div>
      {isOpen && (
        <div className="absolute top-[150%] right-0  ">
          <div
            onClick={() => setIsOpen(false)}
            className="absolute z-10  -top-[5%] -left-[3%] bg-gray-black border border-white-transparent  rounded-lg p-2"
          >
            <img src={closeIcon} alt="" />
          </div>
          <div>
            <div className="relative bg-gray-black w-[500px] h-[400px]  overflow-scroll border-2 border-white-transparent grid grid-cols-2 gap-4 p-5 rounded-lg">
              {templates?.map((template) => (
                <div
                  key={template?.id}
                  onClick={() => setSelectedTemplate(template?.id)}
                >
                  <img
                    src={template?.image}
                    className="w-full max-h-[300px] object-contain rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
