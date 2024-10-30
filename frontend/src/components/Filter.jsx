import { Select, Option } from "@material-tailwind/react";
 
export function Filter() {
  return (
    <div className="w-72">
      <Select className=" border-green-500 border active:border-none " size="lg" color="teal" variant="outlined" label="Select State">
        <Option>Material Tailwind HTML</Option>
        <Option>Material Tailwind React</Option>
        <Option>Material Tailwind Vue</Option>
        <Option>Material Tailwind Angular</Option>
        <Option>Material Tailwind Svelte</Option>
        <Option>Material Tailwind Svelte</Option>
        <Option>Material Tailwind Svelte</Option>
        <Option>Material Tailwind Svelte</Option>
        <Option>Material Tailwind Svelte</Option>
        <Option>Material Tailwind Svelte</Option>
        <Option>Material Tailwind Svelte</Option>
        <Option>Material Tailwind Svelte</Option>
        <Option>Material Tailwind Svelte</Option>
        <Option>Material Tailwind Svelte</Option>
        <Option>Material Tailwind Svelte</Option>
      </Select>
    </div>
  );
}