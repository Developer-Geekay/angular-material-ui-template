import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertFileUri',
  standalone: true,
})
export class ConvertFileUriPipe implements PipeTransform {
  async transform(
    value: string,
    ...args: unknown[]
  ): Promise<string | ArrayBuffer | null> {
    try {
      const dataUrl = await this.toDataURL(value);
      return dataUrl;
    } catch (error) {
      console.error('Error converting file URI to data URL:', error);
      return null;
    }
  }

  toDataURL(url: string): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        const reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result);
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = function (error) {
        reject(error);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    });
  }
}
