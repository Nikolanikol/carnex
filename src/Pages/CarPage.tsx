import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailInfo from "./CarPageComponents/DetailInfo";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/UI/ShadcnCarousel";
import { convertNumber } from "@/utils/splitNumber";
import { Image } from "antd";
import { translateGenerationRow } from "@/utils/translateGenerationRow";

import { formatDate } from "@/utils/formatDate";
import { Button } from "@/UI/ShadcnButton";
// 1. Общая информация об управлении (manage)
interface Manage {
  dummy: boolean;
  dummyVehicleId: number;
  reRegistered: boolean;
  webReserved: boolean;
  registDateTime: string; // ISO дата
  firstAdvertisedDateTime: string;
  modifyDateTime: string;
  subscribeCount: number;
  viewCount: number;
}

// 2. Гарантия внутри категории
interface Warranty {
  userDefined: boolean;
  companyName: string | null;
  bodyMonth: number;
  bodyMileage: number;
  transmissionMonth: number;
  transmissionMileage: number;
}

// 3. Категория автомобиля (category)
interface Category {
  type: string;
  manufacturerCd: string;
  manufacturerName: string;
  modelCd: string;
  modelName: string;
  gradeCd: string;
  gradeName: string;
  gradeEnglishName: string;
  yearMonth: string;
  formYear: string;
  domestic: boolean;
  importType: string;
  originPrice: number;
  manufacturerEnglishName: string;
  modelGroupCd: string;
  modelGroupName: string;
  modelGroupEnglishName: string;
  gradeDetailCd: string;
  gradeDetailName: string;
  gradeDetailEnglishName: string;
  jatoVehicleId: number;
  warranty: Warranty;
}

// 4. Данные объявления (advertisement)
interface Advertisement {
  type: string;
  price: number;
  status: string;
  warrantyStyleColor: string;
  trust: string[];
  hotMark: string[];
  oneLineText: string;
  salesStatus: string | null;
  directInspected: boolean;
  preVerified: boolean;
  extendWarranty: boolean;
  homeService: boolean;
  meetGo: boolean;
  preDelivery: boolean;
  leaseRentInfo: any; // можно заменить на более конкретный тип, если он известен
  encarPassType: string | null;
  encarPassCategoryType: string | null;
  underBodyPhotos: any[];
  hasUnderBodyPhoto: boolean;
  advertisementType: string;
  diagnosisCar: boolean;
}

// 5. Контактная информация (contact)
interface Contact {
  userId: string;
  userType: string;
  no: string; // номер телефона
  address: string;
  contactType: string;
  isOwnerPartner: boolean;
}

// 6. Технические характеристики (spec)
interface Spec {
  type: string;
  mileage: number;
  displacement: number;
  transmissionName: string;
  fuelCd: string;
  fuelName: string;
  colorName: string;
  customColor: string | null;
  seatCount: number;
  bodyName: string;
}

// 7. Описание фотографии (Photo)
// Массив фотографий автомобиля
interface Photo {
  code: string;
  path: string;
  type: string;
  updateDateTime: string; // ISO строка даты
  desc: string | null;
}

// 8. Опции объявления (options)
interface Options {
  type: string;
  standard: string[];
  etc: string[];
  choice: string[];
  tuning: string[];
}

// 9. Состояние (condition)
interface Condition {
  accident: {
    recordView: boolean;
  };
  inspection: {
    formats: string[];
  };
  seizing: {
    seizingCount: number;
    pledgeCount: number;
  };
}

// 10. Информация о партнёрстве (partnership)
interface Partnership {
  brand: string | null;
  testdrive: {
    active: boolean;
  };
  dealer: Dealer;
}

interface Dealer {
  userId: string;
  name: string;
  firm: Firm;
}

interface Firm {
  code: string;
  name: string;
  diag2Partnered: boolean;
  diagnosisCenters: DiagnosisCenter[];
  meetgoCenters: any[]; // если известна структура, можно заменить
}

interface DiagnosisCenter {
  code: string;
  name: string;
  major: boolean;
  telephoneNumber: string;
  address: string;
}

// 11. Контент описания (contents)
interface Contents {
  text: string;
  meetGoText: string | null;
}

// 12. Дополнительное представление (view)
interface View {
  encarDiagnosis: number;
  encarMeetGo: number;
}

// 13. Главный объект каталога (Catalog)
// Объединяет всю информацию о транспортном средстве
interface Catalog {
  manage: Manage;
  category: Category;
  advertisement: Advertisement;
  contact: Contact;
  spec: Spec;
  photos: Photo[];
  options: Options;
  condition: Condition;
  partnership: Partnership;
  contents: Contents;
  view: View;
  vehicleType: string;
  vin: string;
  vehicleId: number;
  vehicleNo: string;
}

const CarPage = () => {
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mainData, detailData] = await Promise.all([
          //   axios.get(
          //     `https://api.encar.com/v1/readside/record/vehicle/${carId}/open?vehicleNo=173%EA%B0%804156`
          //   ),
          axios.get(`https://api.encar.com/v1/readside/vehicle/${id}`),
        ]);
        console.log(mainData.data);

        setMainData(mainData.data);
        setMainDataLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const [catalog, setMainData] = useState<Catalog>();
  const [mainDataLoading, setMainDataLoading] = useState(true);
  const [detailData, setDetailData] = useState();
  if (mainDataLoading) return <div>loading</div>;

  return (
    <div className="text-black border-2  max-w-[1200px]  px-4 ">
      <div>
        {" "}
        {translateGenerationRow(catalog.category.manufacturerName)}{" "}
        {translateGenerationRow(catalog.category.modelName)} <span> / </span>
        <span>{catalog.vehicleNo}</span>
        <span> / </span>
        {catalog.contact.address}
        <span> / </span>
      </div>
      <div className="pt-10">
        <header>
          <h1 className="lg:text-4xl text-xl font-bold mb-2 flex justify-between flex-col lg:fler">
            {/* {catalog.category.manufacturerName} {catalog.category.modelName}{" "}
          {catalog.category.gradeName} */}
            <div className=" border-b-2 border-black">
              {translateGenerationRow(catalog.category.manufacturerName)}{" "}
              {translateGenerationRow(catalog.category.modelName)}{" "}
              {translateGenerationRow(catalog.category.gradeName)}{" "}
              {formatDate(catalog.category.yearMonth)}
            </div>
            <div>{convertNumber(catalog.advertisement.price)} вон</div>
          </h1>
          <div className="flex justify-between">
            <p className="text-gray-600 flex flex-col md:flex-row">
              <span>
                VIN:{" "}
                <span className="font-mono">
                  {catalog.vin ? catalog?.vin : "не указано"}
                </span>{" "}
              </span>
              <span>| Номер: {catalog.vehicleNo}</span>
            </p>
            <span className="font-semibold">
              Пробег: {catalog.spec.mileage.toLocaleString()} км
            </span>{" "}
          </div>
        </header>

        {/* Главый БЛОК //////// */}
        <div className="lg:grid lg:grid-cols-2 flex flex-col">
          {/* ГЛАВНАЯ СЛАЙДЕР */}
          <section className="border rounded py-4 shadow-sm bg-gray-50">
            <h2 className="text-2xl font-semibold ">Фотографии</h2>
            {catalog.photos.length === 0 ? (
              <p>Фотографии отсутствуют</p>
            ) : (
              <div className="border-2 col-span-1">
                <Carousel opts={{ loop: true }}>
                  <CarouselContent>
                    {catalog.photos.map((photo) => (
                      <CarouselItem key={photo.code}>
                        <img
                          src={"https://ci.encar.com" + photo.path}
                          alt={photo.desc || "Car photo"}
                          className="w-full  object-cover rounded-lg max-w-[900px] max-h-[550px]"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            )}
          </section>
          {/* ГЛАВНАЯ ИНФОБЛОК */}
          <div className="col-span-1">
            {" "}
            <DetailInfo
              id={catalog?.vehicleId}
              carnumber={catalog?.vehicleNo}
            />
            <div className="h-[200px] flex items-center justify-center">
              <Button className="py-3 px-4" variant="destructive">
                <a
                  target="_blank"
                  href={
                    "https://www.encar.com/md/sl/mdsl_regcar.do?method=inspectionViewNew&carid=" +
                    catalog?.vehicleId
                  }
                >
                  Просмотреть подробный отчет
                </a>
              </Button>
            </div>
          </div>
        </div>
        {/* ///////////////////////// */}
        <div className="max-w-7xl mx-auto p-6 bg-white text-gray-900 min-h-screen space-y-8">
          {/* Manage */}

          {/* Category */}
          <section className="border rounded p-4 shadow-sm bg-gray-50">
            <h2 className="text-2xl font-semibold mb-3">Категория</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p>
                  <span className="font-semibold">Внутренний/Импорт:</span>{" "}
                  {catalog.category.domestic ? "Внутренний" : "Импорт"}
                </p>
                <p>
                  <span className="font-semibold">Цена нового авто:</span>{" "}
                  {convertNumber(catalog.category.originPrice)}вон
                </p>
                <p>
                  <span className="font-semibold">Гарантия:</span>{" "}
                  {catalog.category.warranty.companyName ?? "Нет данных"}
                </p>
                <p>
                  <span className="font-semibold">Срок гарантии (месяцы):</span>{" "}
                  {catalog.category.warranty.bodyMonth}
                </p>
                <p>
                  <span className="font-semibold">Пробег гарантии:</span>{" "}
                  {catalog.category.warranty.bodyMileage.toLocaleString()} км
                </p>
              </div>
              <div>
                {/* <p>
                <span className="font-semibold">Пробег:</span>{" "}
                {catalog.spec.mileage.toLocaleString()} км
              </p> */}
                <p>
                  <span className="font-semibold">Объем двигателя:</span>{" "}
                  {catalog.spec.displacement} см³
                </p>
                <p>
                  <span className="font-semibold">Трансмиссия:</span>{" "}
                  {translateGenerationRow(catalog.spec.transmissionName)}
                </p>
                <p>
                  <span className="font-semibold">Топливо:</span>{" "}
                  {translateGenerationRow(catalog.spec.fuelName)}
                </p>
                <p>
                  <span className="font-semibold">Цвет:</span>{" "}
                  {translateGenerationRow(catalog.spec.colorName)}
                </p>
                <p>
                  <span className="font-semibold">Пользовательский цвет:</span>{" "}
                  {catalog.spec.customColor ?? "—"}
                </p>
                <p>
                  <span className="font-semibold">Количество мест:</span>{" "}
                  {catalog.spec.seatCount}
                </p>
                <p>
                  <span className="font-semibold">Тип кузова:</span>{" "}
                  {translateGenerationRow(catalog.spec.bodyName)}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-semibold">Дилер:</span>{" "}
                  {catalog.contact.userId} ({catalog.contact.userType})
                </p>
                <p>
                  <span className="font-semibold">Телефон:</span>{" "}
                  {catalog.contact.no}
                </p>
                <p>
                  <span className="font-semibold">Адрес:</span>{" "}
                  {catalog.contact.address}
                </p>
                <p>
                  <span className="font-semibold">Тип контакта:</span>{" "}
                  {catalog.contact.contactType}
                </p>
                <p>
                  <span className="font-semibold">Партнёр владельца:</span>{" "}
                  {catalog.contact.isOwnerPartner ? "Да" : "Нет"}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

interface OptionListProps {
  title: string;
  options: string[];
}

export const OptionList: React.FC<OptionListProps> = ({ title, options }) => {
  if (!options || options.length === 0) return null;

  return (
    <div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <ul className="list-disc list-inside max-h-40 overflow-y-auto text-sm space-y-0.5">
        {options.map((option, idx) => (
          <li key={idx}>{option}</li>
        ))}
      </ul>
    </div>
  );
};
export default CarPage;

{
  /* Advertisement */
}
//   <section className="border rounded p-4 shadow-sm bg-gray-50">
//     <h2 className="text-2xl font-semibold mb-3">Объявление</h2>
//     <p className="text-lg font-bold mb-2">
//     {catalog.advertisement.price.toLocaleString()} 원
//   </p>
//     <p>
//       <span className="font-semibold">Статус:</span>{" "}
//       {catalog.advertisement.status}
//     </p>
//     <p>
//       <span className="font-semibold">Гарантия:</span>{" "}
//       {catalog.advertisement.warrantyStyleColor}
//     </p>
//     <p>
//       <span className="font-semibold">Текст объявления:</span>{" "}
//       {catalog.advertisement.oneLineText}
//     </p>
//     <div className="flex flex-wrap gap-2 mt-2">
//       {catalog.advertisement.trust.map((item, i) => (
//         <span
//           key={i}
//           className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs"
//         >
//           {item}
//         </span>
//       ))}
//       {catalog.advertisement.hotMark.map((item, i) => (
//         <span
//           key={i}
//           className="bg-red-200 text-red-800 px-2 py-1 rounded text-xs"
//         >
//           {item}
//         </span>
//       ))}
//     </div>
//     <div className="mt-2 space-x-2 text-sm">
//       <span>
//         {catalog.advertisement.directInspected
//           ? "Прямой осмотр"
//           : "Без осмотра"}
//       </span>
//       <span>
//         {catalog.advertisement.preVerified
//           ? "Предварительно проверен"
//           : ""}
//       </span>
//       <span>
//         {catalog.advertisement.extendWarranty
//           ? "Расширенная гарантия"
//           : ""}
//       </span>
//       <span>
//         {catalog.advertisement.homeService ? "Домашний сервис" : ""}
//       </span>
//       <span>{catalog.advertisement.meetGo ? "MeetGo" : ""}</span>
//       <span>
//         {catalog.advertisement.preDelivery
//           ? "Предварительная доставка"
//           : ""}
//       </span>
//     </div>
//   </section>

{
  /* <div>
              <p>
                <span className="font-semibold">Тип:</span>{" "}
                {catalog.category.type}
              </p>
              <p>
                <span className="font-semibold">Производитель:</span>{" "}
                {catalog.category.manufacturerName}
              </p>
              <p>
                <span className="font-semibold">Модель:</span>{" "}
                {catalog.category.modelName}
              </p>
              <p>
                <span className="font-semibold">Грейд:</span>{" "}
                {catalog.category.gradeName}
              </p>
              <p>
                <span className="font-semibold">Год выпуска:</span>{" "}
                {catalog.category.yearMonth}
              </p>
            </div> */
}

{
  /* <section className="border rounded p-4 shadow-sm bg-gray-50">
            <h2 className="text-2xl font-semibold mb-3">Опции</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <OptionList
                title="Стандартные"
                options={catalog.options.standard}
              />
              <OptionList
                title="Дополнительные"
                options={catalog.options.etc}
              />
              <OptionList title="Выборочные" options={catalog.options.choice} />
              <OptionList title="Тюнинг" options={catalog.options.tuning} />
            </div>
          </section> */
}
