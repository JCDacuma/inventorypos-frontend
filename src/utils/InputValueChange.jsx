//Input Change
export function HandleInputChange(value, field, setState) {
  setState((prev) => ({
    ...prev,
    [field]: value,
  }));
}
