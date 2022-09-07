import { BadRequestException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
export class Camper extends AggregateRoot {
  /**Camper Domain Model */

  constructor(
    private readonly _id: string,
    private readonly name: string,
    private readonly age: number,
    private allergies: string[],
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getName(): string {
    return this.name;
  }

  getAge(): number {
    return this.age;
  }

  getAllergies(): string[] {
    return [...this.allergies]; // To pass a copy of the array
  }

  updateAllergies(allergies: string[]): void {
    const allergiesToLower = allergies.map((allergy) =>
      allergy.toLocaleLowerCase().trim(),
    );
    if (allergiesToLower.includes('chocolate'))
      throw new BadRequestException('Allergi may not be chocolate!');
    this.allergies = allergiesToLower;
  }
}
