"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface EditOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (quantity: number) => Promise<void>; // Теперь передаем только количество
  initialQuantity: number;
  isLoading?: boolean;
}

export const EditOrderModal = ({
  isOpen,
  onClose,
  onSave,
  initialQuantity,
  isLoading,
}: EditOrderModalProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity < 1) return;
    await onSave(quantity);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Изменение количества">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Укажите новое количество шт.
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full text-sm p-2.5 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            min="1"
            disabled={isLoading}
            required
            autoFocus
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Отмена
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            disabled={quantity < 1}
          >
            Сохранить
          </Button>
        </div>
      </form>
    </Modal>
  );
};

// "use client";

// import { useState } from "react";
// import { Modal } from "@/components/ui/Modal"; // Корректируй путь импорта под свой проект
// import { Button } from "@/components/ui/Button";

// interface EditOrderModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (title: string, quantity: number) => Promise<void>;
//   initialTitle: string;
//   initialQuantity: number;
//   isLoading?: boolean;
// }

// export const EditOrderModal = ({
//   isOpen,
//   onClose,
//   onSave,
//   initialTitle,
//   initialQuantity,
//   isLoading,
// }: EditOrderModalProps) => {
//   const [title, setTitle] = useState(initialTitle);
//   const [quantity, setQuantity] = useState(initialQuantity);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!title.trim() || quantity < 1) return;
//     await onSave(title, quantity);
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} title="Редактирование заказа">
//       <form onSubmit={handleSubmit} className="space-y-5">
//         <div className="space-y-1.5">
//           <label className="text-sm font-medium text-gray-700">
//             Название публикации
//           </label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full text-sm p-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             disabled={isLoading}
//             required
//           />
//         </div>

//         <div className="space-y-1.5">
//           <label className="text-sm font-medium text-gray-700">
//             Количество
//           </label>
//           <input
//             type="number"
//             value={quantity}
//             onChange={(e) => setQuantity(Number(e.target.value))}
//             className="w-32 text-sm p-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             min="1"
//             disabled={isLoading}
//             required
//           />
//         </div>

//         <div className="flex justify-end gap-3 pt-2">
//           <Button
//             type="button"
//             variant="secondary"
//             onClick={onClose}
//             disabled={isLoading}
//           >
//             Отмена
//           </Button>
//           <Button
//             type="submit"
//             variant="primary"
//             isLoading={isLoading}
//             disabled={!title.trim() || quantity < 1}
//           >
//             Сохранить
//           </Button>
//         </div>
//       </form>
//     </Modal>
//   );
// };
