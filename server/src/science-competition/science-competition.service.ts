import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { ScienceCompetition, Language } from "@prisma/client";
import { deleteFilePack, deleteFiles } from "../common/helpers/storage.helper";
import "moment/locale/uk";
import * as moment from "moment";
import { CreateScienceCompetitionDto } from "./dto/create-science-competition.dto";
import { UpdateScienceCompetitionDto } from "./dto/update-science-competition.dto";

moment.locale("uk");

@Injectable()
export class ScienceCompetitionService {
  constructor(private prismaService: PrismaService) {}

  create(createDto: CreateScienceCompetitionDto) {
    return this.prismaService.scienceCompetition.create({
      data: createDto,
    });
  }

  async findAll(language: Language) {
    const data = await this.prismaService.scienceCompetition.findMany({
      where: { language },
    });
    return this.groupByMonth(data);
  }

  async findOne(id: string) {
    const data = await this.prismaService.scienceCompetition.findUnique({
      where: { id },
    });
    if (!data) throw new NotFoundException();
    return {
      ...data,
      dateISO: data.date,
      toDateISO: data.toDate,
      date: moment(data.date).format("D MMMM"),
      toDate: data.toDate ? moment(data.toDate).format("D MMMM") : null,
    };
  }

  async update(id: string, updateDto: UpdateScienceCompetitionDto) {
    const data = await this.findOne(id);
    await deleteFilePack(data.files, updateDto.files);

    return this.prismaService.scienceCompetition.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    const data = await this.findOne(id);

    await deleteFiles(data.files);

    return this.prismaService.scienceCompetition.delete({ where: { id } });
  }

  groupByMonth(data: ScienceCompetition[]) {
    const monthNamesUkr = [
      "Січень",
      "Лютий",
      "Березень",
      "Квітень",
      "Травень",
      "Червень",
      "Липень",
      "Серпень",
      "Вересень",
      "Жовтень",
      "Листопад",
      "Грудень",
    ];
    const grouped = data.reduce(
      (accumulator, item) => {
        const monthIndex = new Date(item.date).getMonth();
        const month = monthNamesUkr[monthIndex];

        if (!accumulator[monthIndex]) {
          accumulator[monthIndex] = { month, items: [] };
        }

        accumulator[monthIndex].items.push({
          ...item,
          dateISO: item.date,
          toDateISO: item.toDate,
          date: moment(item.date).format("D MMMM"),
          toDate: item.toDate ? moment(item.toDate).format("D MMMM") : null,
        });
        return accumulator;
      },
      {} as Record<number, { month: string; items: any[] }>,
    );

    return Object.keys(grouped)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .map((key) => ({
        month: grouped[parseInt(key)].month,
        items: grouped[parseInt(key)].items,
      }));
  }
}
