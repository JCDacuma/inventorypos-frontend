import { DefaultDropDown } from "@/components/ui/dropdown.jsx";
import { RadioGroup } from "@/components/ui/radioGroup.jsx";
import { ListRestart } from "lucide-react";
import { motion } from "framer-motion";
export function BatchEditLayout({
  editInputs,
  dropdownChange,
  inputChange,
  inputSetter,
  inputReset,
  submitEdit,
  disabled,
}) {
  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-200px)] 2xl:h-[calc(100vh-350px)] py-5 overflow-auto justify-between">
      <div className="flex flex-col gap-2 ">
        <div className="flex flex-col gap-2 px-5 ">
          {editInputs.map((input, index) => {
            if (input.type === "dropdown") {
              return (
                <div
                  key={index}
                  className="flex flex-col gap-2 p-3 transition-all duration-300 border rounded-xl bg-white/5 border-violet-300/40 hover:border-violet-400"
                >
                  <span className="text-sm font-medium tracking-wide text-violet-800">
                    {input.name}
                  </span>

                  <DefaultDropDown
                    disabled={input.disable}
                    placeholder={input.placeholder}
                    icons={input.icon}
                    BtnIcons={input.hasBtn ? input.btnIcon : null}
                    OnClick={input.hasBtn ? input.onClick : null}
                    items={input.option}
                    SetSelected={(e) =>
                      input.isString
                        ? inputChange(e, input.name, inputSetter)
                        : dropdownChange(e, input.name)
                    }
                    selectedValue={input.value}
                  />
                </div>
              );
            }
            if (input.type === "radioInput") {
              return (
                <div
                  key={index}
                  className="flex flex-col gap-2 p-3 transition-all duration-300 border rounded-xl bg-white/5 border-violet-300/40 hover:border-violet-400"
                >
                  <span className="text-sm font-medium tracking-wide text-violet-800">
                    {input.name}
                  </span>

                  <RadioGroup
                    disabled={input.disable}
                    options={input.radioOption}
                    onChange={(e) => inputChange(e, input.name, inputSetter)}
                    value={input.radioValue}
                    className="flex flex-wrap gap-3"
                  />
                </div>
              );
            }
          })}
        </div>
      </div>

      <div className="flex items-center justify-center w-full gap-3 px-6 mt-4">
        {/* Reset Button */}
        <motion.button
          onClick={() => inputReset()}
          disable={disabled}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          title="Reset"
          className="flex items-center justify-center p-3 transition-colors duration-200 border shadow-sm cursor-pointer rounded-xl border-violet-300 text-violet-700 hover:bg-violet-100 hover:shadow-md"
        >
          <ListRestart className="w-5 h-5" />
        </motion.button>

        {/* Edit Selected Button */}
        <motion.button
          onClick={() => submitEdit()}
          disable={disabled}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          className="flex-1 px-4 py-3 font-semibold text-white transition-colors duration-200 shadow-md cursor-pointer bg-violet-600 rounded-xl hover:bg-violet-700 active:bg-violet-800"
        >
          Edit Selected
        </motion.button>
      </div>
    </div>
  );
}
