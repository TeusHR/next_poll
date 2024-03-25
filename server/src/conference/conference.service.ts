import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateConferenceDto } from "./dto/create-conference.dto";
import { UpdateConferenceDto } from "./dto/update-conference.dto";
import { PrismaService } from "../prisma.service";
import { deleteFile } from "../common/helpers/storage.helper";

@Injectable()
export class ConferenceService {
  constructor(private prismaService: PrismaService) {}

  create(createConferenceDto: CreateConferenceDto) {
    return this.prismaService.conference.create({
      data: createConferenceDto,
    });
  }

  findAll(limit: number) {
    return this.prismaService.conference.findMany({
      orderBy: { updatedAt: "desc" },
      take: limit || undefined,
    });
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
    if (conference.files.length && updateConferenceDto.files) {
      const filtered = conference.files.filter(
        (file) => !updateConferenceDto.files.includes(file),
      );
      for (let i = 0; i < filtered.length; i++) {
        await deleteFile(filtered[i], true);
      }
    }
    return this.prismaService.conference.update({
      where: { id },
      data: updateConferenceDto,
    });
  }

  async remove(id: string) {
    const conference = await this.findOne(id);
    if (conference.files) {
      for (let i = 0; i < conference.files.length; i++) {
        await deleteFile(conference.files[i], true);
      }
    }
    return this.prismaService.conference.delete({ where: { id } });
  }
}
