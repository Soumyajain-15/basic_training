// Shape Interface
interface Shape {
  area(): number;
  perimeter(): number;
}

//  Circle Class
class Circle implements Shape {
  radius: number = 0;

  area(): number {
    return Math.PI * this.radius ** 2;
  }

  perimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

// Rectangle Class
class Rectangle implements Shape {
  width: number = 0;
  height: number = 0;

  area(): number {
    return this.width * this.height;
  }

  perimeter(): number {
    return 2 * (this.width + this.height);
  }
}

// Create Instances
const circle = new Circle();
circle.radius = 5;

const rectangle = new Rectangle();
rectangle.width = 4;
rectangle.height = 6;

// Calculate Area & Perimeter Directly
console.log("Circle Area:", circle.area());
console.log("Circle Perimeter:", circle.perimeter());
console.log("-----");

console.log("Rectangle Area:", rectangle.area());
console.log("Rectangle Perimeter:", rectangle.perimeter());
console.log("-----");





function filterByType<T>(
  arr: unknown[],
  type: 'string' | 'number' | 'boolean' | 'object'
): T[] {
  return arr.filter((item): item is T => {
    if (type === 'object') {
      return typeof item === 'object' && item !== null;
    }
    return typeof item === type;
  });
}

// Usage
const mixedArray: unknown[] = [1, 'hello', true, null, { name: 'Somu' }, 42, 'world'];

const numbers = filterByType<number>(mixedArray, 'number');
console.log('Numbers:', numbers);

const strings = filterByType<string>(mixedArray, 'string');
console.log('Strings:', strings);

const booleans = filterByType<boolean>(mixedArray, 'boolean');
console.log('Booleans:', booleans);

const objects = filterByType<object>(mixedArray, 'object');
console.log('Objects:', objects);
// Define the Result type (Discriminated Union)
type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E };

// Function that returns Result instead of throwing
function safeDivide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return { ok: false, error: "Division by zero not allowed" };
  }
  return { ok: true, value: a / b };
}

//  Correct Usage
const result1 = safeDivide(10, 2);
if (result1.ok === true) {
  console.log("Result:", result1.value);
} else {
  console.log("Error:", result1.error);
}

const result2 = safeDivide(8, 0);
if (result2.ok === true) {
  console.log("Result:", result2.value);
} else {
  console.log("Error:", result2.error);
}
