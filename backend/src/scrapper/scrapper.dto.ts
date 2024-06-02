import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export class UrlsDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  urls: string[];
}
