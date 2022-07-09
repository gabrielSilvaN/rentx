import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("[Create Car Use Case]", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();

    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("Should be able to create a new car", async () => {
    const data = {
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    };
    const car = await createCarUseCase.execute(data);
    expect(car.available).toBe(true);
    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car with already created license plate", () => {
    expect(async () => {
      const data = {
        name: "Name Car",
        description: "Description Car",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Brand",
        category_id: "category",
      };
      await createCarUseCase.execute(data);
      await createCarUseCase.execute(data);
    }).rejects.toThrow();
  });
});
