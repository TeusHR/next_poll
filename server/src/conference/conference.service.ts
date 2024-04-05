import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateConferenceDto } from "./dto/create-conference.dto";
import { UpdateConferenceDto } from "./dto/update-conference.dto";
import { PrismaService } from "../prisma.service";
import { Conference } from "@prisma/client";
import { deleteFilePack, deleteFiles } from "../common/helpers/storage.helper";
import "moment/locale/uk";
import * as moment from "moment";

moment.locale("uk");

@Injectable()
export class ConferenceService {
  constructor(private prismaService: PrismaService) {}

  create(createConferenceDto: CreateConferenceDto) {
    return this.prismaService.conference.create({
      data: createConferenceDto,
    });
  }

  async findAll() {
    const conferences = await this.prismaService.conference.findMany();
    return this.groupByMonth(conferences);
  }

  async findOne(id: string) {
    const conference = await this.prismaService.conference.findUnique({
      where: { id },
    });
    if (!conference) throw new NotFoundException();
    return conference;
  }

  async update(id: string, updateConferenceDto: UpdateConferenceDto) {
    const conference = await this.findOne(id);
    await deleteFilePack(conference.files, updateConferenceDto.files);

    return this.prismaService.conference.update({
      where: { id },
      data: updateConferenceDto,
    });
  }

  async remove(id: string) {
    const conference = await this.findOne(id);

    await deleteFiles(conference.files);

    return this.prismaService.conference.delete({ where: { id } });
  }

  groupByMonth(conferences: Conference[]) {
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
    const grouped = conferences.reduce(
      (accumulator, item) => {
        const monthIndex = new Date(item.date).getMonth();
        const month = monthNamesUkr[monthIndex];

        if (!accumulator[monthIndex]) {
          accumulator[monthIndex] = { month, items: [] };
        }

        accumulator[monthIndex].items.push({
          ...item,
          date: moment(item.date).format("D MMMM"),
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
