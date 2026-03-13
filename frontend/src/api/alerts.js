import Swal from 'sweetalert2';
import { toast } from 'sonner';

// ===== TOASTS (notificaciones rápidas) =====
export const toastSuccess = (msg) => toast.success(msg);
export const toastError = (msg) => toast.error(msg);
export const toastInfo = (msg) => toast.info(msg);

// ===== MODALES DE CONFIRMACIÓN =====
export const confirmDelete = (text = '¿Deseas continuar?') =>
    Swal.fire({
        title: '¿Estás seguro?',
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#212529',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

export const confirmAction = (title, text, confirmText = 'Confirmar') =>
    Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#212529',
        cancelButtonColor: '#6c757d',
        confirmButtonText: confirmText,
        cancelButtonText: 'Cancelar'
    });